import React, { Component } from 'react'
import d3 from 'd3'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import api from './../../api'
import colors from './../../config/colors'
import { sizes } from '../../utils/mediaQueryTemplate'

const Wrap = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
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

// Transforms input data by adding depth indexes
const flatten = root => {
  const nodes = []
  let i = 0
  const recurse = (node, depth) => {
    node.depth = depth
    if (node.children)
      node.children.forEach(n => {
        recurse(n, node.depth + 1)
      })
    if (!node.id) node.id = ++i
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
    node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .on('mouseover', function(d) {
        widget
          .append('foreignObject')
          .attr({
            x: d.x - 50,
            width: 100,
            class: 'd3-tooltip',
            ...(d.y > 100
              ? {
                  y: d.y - getNodeSize(d.depth) / 2 - 40,
                  height: 29,
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
      })
      .on('mouseout', function() {
        widget.selectAll('.d3-tooltip').remove()
      })
      .call(force.drag)
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
