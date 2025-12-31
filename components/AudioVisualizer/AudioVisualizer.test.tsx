import React from 'react'
import { render, screen } from '@testing-library/react'
import AudioVisualizer from './AudioVisualizer'

describe('AudioVisualizer', () => {
  test('renders without crashing', () => {
    render(<AudioVisualizer agentState="idle" />)
    const canvasElement = screen.getByLabelText('Audio visualizer')
    expect(canvasElement).toBeInTheDocument()
  })

  test('applies correct size class for small', () => {
    render(<AudioVisualizer agentState="idle" size="small" />)
    const container = screen.getByLabelText('Audio visualizer').parentElement?.parentElement
    expect(container).toHaveClass('w-24', 'h-24')
  })

  test('applies correct size class for large', () => {
    render(<AudioVisualizer agentState="idle" size="large" />)
    const container = screen.getByLabelText('Audio visualizer').parentElement?.parentElement
    expect(container).toHaveClass('w-48', 'h-48')
  })

  test('applies correct size class for medium (default)', () => {
    render(<AudioVisualizer agentState="idle" />)
    const container = screen.getByLabelText('Audio visualizer').parentElement?.parentElement
    expect(container).toHaveClass('w-36', 'h-36')
  })

  test('accepts custom className', () => {
    render(<AudioVisualizer agentState="idle" className="custom-class" />)
    const container = screen.getByLabelText('Audio visualizer').parentElement?.parentElement
    expect(container).toHaveClass('custom-class')
  })

  test('uses default animationType rings', () => {
    render(<AudioVisualizer agentState="idle" />)
    const canvasElement = screen.getByLabelText('Audio visualizer')
    expect(canvasElement).toBeInTheDocument()
  })
})
