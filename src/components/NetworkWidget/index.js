import React, { Component } from 'react'
import d3 from 'd3'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import hexToRgba from 'utils/hexToRgba'

import colors from 'config/colors'
import { sizes } from 'utils/mediaQueryTemplate'
import api from 'api'
import { history } from 'appRouter'

const Wrap = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;

  .d3-tooltip-container {
    background-color: ${colors.dark};
    border-radius: 4px;
    display: table;
    white-space: nowrap;
    min-width: 100px;

    p {
      width: 100px;
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
    left: 45px;
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

// Calculates link length depending on the depth level
const getLinkLength = (sourceDepth, targetDepth) =>
  15 + getNodeSize(sourceDepth) / 2 + getNodeSize(targetDepth) / 2

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
    node.children.forEach(el => {
      el.brothers = node.children.length
      if (el.children) recurse(el)
    })
  }
  recurse(data)
}

// Transforms input data by adding depth indexes
const flatten = root => {
  addChildrenLength(root)
  let children = Array.isArray(root.children) && root.children.slice(0, 5)
  root = { ...root, children }
  const nodes = []
  let i = 0
  const recurse = (node, depth, childIndex) => {
    node.depth = depth
    if (node.children) {
      node.children.forEach((n, childIndex) => {
        n.children = n.children && n.children.slice(0, 5)
        recurse(n, node.depth + 1, childIndex)
      })
    }

    if (!node.id) node.id = ++i
    if (childIndex >= 4 && node.brothers > 5) {
      node.badge = `+${node.brothers - 4}`
    }
    nodes.push(node)
  }
  recurse(root, 0)
  return nodes
}

// Returns widget container dimensions
const getDimensions = () => {
  const targetNode = document.getElementById('network_widget')
  return {
    width: (targetNode && targetNode.clientWidth) || window.innerWidth,
    height: window.innerWidth < sizes.phone ? 300 : 500,
  }
}

// Sets new positions for links and nodes on tick
const tick = (link, node) => {
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

class NetworkWidget extends Component {
  componentDidMount() {
    // Get widget container dimensions
    const { width, height } = getDimensions()

    // Create widget container
    const widget = d3
      .select('#network_widget')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr(
        'filter',
        `drop-shadow(0 1px 10px ${hexToRgba(`${colors.dark}`, 0.08)})`,
      )

    // Create definitions container
    const defs = widget.append('defs')

    // Initialize force layout, nodes and links
    const force = d3.layout.force()
    const nodes = flatten(this.props.data)
    const links = d3.layout.tree().links(nodes)

    // Get references to the links and nodes
    let link = widget.selectAll('line.link').data(links, d => d.target.id)
    let node = widget.selectAll('g.node').data(nodes, d => d.id)

    // Configure force layout
    force
      .nodes(nodes)
      .links(links)
      .gravity(0)
      .charge(-5000)
      .linkDistance(d => getLinkLength(d.source.depth, d.target.depth))
      .friction(0.2)
      .linkStrength(() => 10)
      .size([width, height])
      .on('tick', () => tick(link, node))
      .start()

    // Draw links
    link
      .enter()
      .insert('line')
      .attr('class', 'link')
      .style('stroke', colors.gray)

    // Draw nodes
    const nodeWithFiveChildren = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('cursor', 'pointer')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .on('mouseover', function(d) {
        if (!d.badge) {
          widget
            .append('foreignObject')
            .attr({
              x: d.x - 50,
              width: 100,
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
            .html(d.fullName || 'Deleted user')
        }
      })
      .on('mouseout', function() {
        widget.selectAll('.d3-tooltip').remove()
      })
      .on('click', function(e) {
        history.push(`/account/person/${e.id}`)
      })
      .call(force.drag)

    nodeWithFiveChildren
      .filter(i => i.badge)
      .append('circle')
      .attr('r', d => getNodeSize(d.depth) / 2)
      .attr('stroke', colors.ocean)
      .attr('fill', colors.ocean)

    nodeWithFiveChildren
      .filter(i => i.badge)
      .append('text')
      .attr('font-size', d => getNodeSize(d.depth) * 0.4)
      .attr('font-family', 'Noto Sans')
      .attr('fill', 'white')
      .text(d => d.badge)
      .attr('x', d => -getNodeSize(d.depth) * (d.brothers > 13 ? 0.3 : 0.2))
      .attr('y', d => getNodeSize(d.depth) * 0.1)

    nodeWithFiveChildren
      .filter(i => i.badge)
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

    nodeWithFiveChildren
      .filter(i => !i.badge)
      .append('image')
      .attr(
        'xlink:href',
        d => d.photo || api.getUserInitialAvatar(d.fullName || '?'),
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
  }

  render() {
    return <Wrap id="network_widget" />
  }
}

NetworkWidget.propTypes = {
  data: PropTypes.object.isRequired,
}

export default NetworkWidget
