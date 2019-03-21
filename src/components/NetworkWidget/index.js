import React, { Component } from 'react'
import d3 from 'd3'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import hexToRgba from 'utils/hexToRgba'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import colors from 'config/colors'
import { sizes } from 'utils/mediaQueryTemplate'
import { getUserInitialAvatar } from 'api'

const Wrap = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;

  .d3-tooltip-container {
    background-color: ${colors.dark};
    border-radius: 4px;
    white-space: nowrap;
    min-width: 100px;

    p {
      color: white;
      padding: 6px 8px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .d3-tooltip-container:after {
    background: inherit;
    bottom: 2px;
    content: '';
    height: 10px;
    left: calc(50% - 5px);
    position: absolute;
    transform: rotate(45deg);
    width: 10px;
  }
`

// Returns node size depending on the depth level
const getNodeSize = depth => {
  switch (depth) {
    case 0:
      return 105
    case 1:
      return 52
    default:
      return 30
  }
}

// Calculates link length depending on the depth level and children count
const getLinkLength = (sourceDepth, targetDepth, children = []) =>
  15 +
  getNodeSize(sourceDepth) / 2 +
  getNodeSize(targetDepth) / 2 +
  children.length * 2.5

// Transforms nodes positions to avoid falling out of the edges
const nodeTransform = d => {
  const { width, height } = getDimensions()
  const nodeSize = getNodeSize(d.depth)
  if (d.depth === 0) {
    d.x = width / 2
    d.y = height / 2
  } else {
    d.x = Math.max(nodeSize, Math.min(width - (nodeSize / 2 || 16), d.x))
    d.y = Math.max(nodeSize, Math.min(height - (nodeSize / 2 || 16), d.y))
  }
  return `translate(${d.x}, ${d.y})`
}

function addChildrenLength(data) {
  const recurse = node => {
    if (!node.children) node.children = []
    node.children.forEach(el => {
      el.brothers = node.children
      if (el.children) recurse(el)
    })
  }
  recurse(data)
}

// Returns widget container dimensions
const getDimensions = () => {
  const targetNode = document.getElementById('network_widget')
  return {
    width: (targetNode && targetNode.clientWidth) || window.innerWidth,
    height: window.innerWidth < sizes.phone ? 300 : 500,
  }
}
let force, link, node, widget, defs

class NetworkWidget extends Component {
  componentDidMount() {
    const { width, height } = getDimensions()
    widget = d3
      .select('#network_widget')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr(
        'filter',
        `drop-shadow(0 1px 10px ${hexToRgba(`${colors.dark}`, 0.08)})`,
      )
    defs = widget.append('defs')
    force = d3.layout
      .force()
      .gravity(0)
      .charge(-5000)
      .linkDistance(d =>
        getLinkLength(d.source.depth, d.target.depth, d.source.children),
      )
      .friction(0.2)
      .linkStrength(() => 10)
      .size([width, height])
      .on('tick', () => this.tick(link, node))
    link = widget.selectAll('.link')
    node = widget.selectAll('.node')
    this.update()
  }

  update = () => {
    var nodes = this.flatten(this.props.data)
    var links = d3.layout.tree().links(nodes)

    // Restart the force layout.
    force
      .links(links)
      .nodes(nodes)
      .start()

    // Update links.
    link = link.data(links, function(d) {
      return d.target.id
    })

    link.exit().remove()

    link
      .enter()
      .insert('line', '.node')
      .attr('class', 'link')
      .style('stroke', colors.gray)

    // Update nodes.
    node = node.data(nodes, function(d) {
      return d.id
    })
    node.exit().remove()

    node.selectAll('circle').remove()
    widget.selectAll('.d3-tooltip').remove()

    node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('cursor', 'pointer')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .on('mouseover', d => {
        const label =
          d.fullName ||
          this.props.intl.formatMessage({
            id: 'app.dashboardPage.deletedUser',
          })
        const fullNameWidth = Math.max(100, label.length * 7.8 + 16)
        widget
          .append('foreignObject')
          .attr({
            x: d.x - fullNameWidth / 2,
            width: fullNameWidth,
            class: 'd3-tooltip',
            ...(d.y > 100
              ? {
                  y: d.y - getNodeSize(d.depth) / 2 - 50,
                  height: 39,
                }
              : { y: d.y + getNodeSize(d.depth) / 2 + 12, height: 0 }),
          })
          .append('xhtml:div')
          .append('div')
          .attr({
            class: 'd3-tooltip-container',
          })
          .append('p')
          .html(label)
      })
      .on('mouseout', function() {
        widget.selectAll('.d3-tooltip').remove()
      })
      .on('click', this.handleClick)
      .on('dblclick', this.handleDoubleClick)
      .call(force.drag)

    node
      .append('image')
      .attr(
        'xlink:href',
        d => d.photo || getUserInitialAvatar(d.fullName || '?'),
      )
      .attr('x', d => -(getNodeSize(d.depth) / 2))
      .attr('y', d => -(getNodeSize(d.depth) / 2))
      .attr('height', d => getNodeSize(d.depth))
      .attr('width', d => getNodeSize(d.depth))
      .attr('clip-path', d => {
        // Create clip-path definition
        defs
          .append('clipPath')
          .attr('id', `clipPath${d.id}`)
          .append('circle')
          .attr('r', getNodeSize(d.depth) / 2)
        // Set clip-path definition
        return `url(#clipPath${d.id})`
      })
      .attr('preserveAspectRatio', 'none')

    node
      .filter(i => i.badge && !i.expanded)
      .append('circle')
      .attr('r', d => getNodeSize(d.depth) / 4)
      .attr('stroke', colors.ocean)
      .attr('fill', colors.ocean)
      .attr(
        'transform',
        d =>
          `translate(${getNodeSize(d.depth) * 0.3}, ${-getNodeSize(d.depth) *
            0.3})`,
      )

    node
      .filter(i => i.badge && !i.expanded)
      .append('text')
      .attr('font-size', d => getNodeSize(d.depth) * 0.2)
      .attr('font-family', 'Noto Sans')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('fill', 'white')
      .text(d => d.badge)
      .attr('x', d => getNodeSize(d.depth) * 0.3)
      .attr('y', d => -getNodeSize(d.depth) * 0.3)
    node
      .filter(i => i.badge && !i.expanded)
      .append('text')
      .attr('x', d => -(getNodeSize(d.depth) / 2))
      .attr('y', d => -(getNodeSize(d.depth) / 10))
      .attr('height', d => getNodeSize(d.depth))
      .attr('width', d => getNodeSize(d.depth))
      .attr('clip-path', d => {
        // Create clip-path definition
        defs
          .append('clipPath')
          .attr('id', `clipPath${d.id}`)
          .append('circle')
          .attr('r', getNodeSize(d.depth) / 2)
        // Set clip-path definition
        return `url(#clipPath${d.id})`
      })
      .attr('preserveAspectRatio', 'none')
  }

  handleClick = user => {
    if (d3.event.defaultPrevented) return // ignore drag
    if (user.children && user.children.length > 0) {
      user._children = user.children
      user.children = null
      user.expanded = false
    } else {
      user.children = user._children
      user._children = null
      user.expanded = true
    }
    this.update()
  }

  handleDoubleClick = user => {
    this.props.history.push(`/account/${user.id}`)
  }

  // Transforms input data by adding depth indexes and badges
  flatten = root => {
    addChildrenLength(root)
    let nodes = []
    let i = 0
    function recurse(node, depth, childIndex) {
      node.depth = depth
      if (node.children) {
        node.children.forEach((n, childIndex) => {
          recurse(n, node.depth + 1, childIndex)
        })
      }
      if (!node.id) node.id = ++i
      if (node.children && node.children.length > 0) {
        node.badge = `+${node.children.length}`
      }
      nodes.push(node)
    }
    recurse(root, 0)
    return nodes
  }

  tick = (link, node) => {
    link
      .attr('x1', d => {
        if (d.source.depth === 0) {
          const { width } = getDimensions()
          return width / 2
        }
        return d.source.x
      })
      .attr('y1', d => {
        if (d.source.depth === 0) {
          const { height } = getDimensions()
          return height / 2
        }
        return d.source.y
      })
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
    node.attr('transform', nodeTransform)
  }

  render() {
    return <Wrap id="network_widget" />
  }
}

NetworkWidget.propTypes = {
  data: PropTypes.object.isRequired,
  intl: PropTypes.object,
  history: PropTypes.object,
}

export default compose(
  injectIntl,
  withRouter,
)(NetworkWidget)
