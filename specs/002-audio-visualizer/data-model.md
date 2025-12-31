# Data Model: Audio Visualizer Component

## Component Entity: AudioVisualizer

### Properties
- **agentState** (string): Current state of the agent ('idle', 'listening', 'processing', 'speaking')
- **intensity** (number): Animation intensity level based on agent state (0.0 to 1.0)
- **animationStyle** (string): Current animation pattern ('wave', 'bars', 'rings', 'pulse')
- **ref** (React.Ref): Direct ref prop for component access (no forwardRef used)

### State Transitions
- **idle** → **listening**: Triggered when agent starts listening to user input
  - Animation intensity increases from low to medium
  - Animation pattern shifts to reactive behavior
- **listening** → **processing**: Triggered when agent processes user input
  - Animation intensity increases to high
  - Animation pattern shifts to pulsing/loading
- **processing** → **speaking**: Triggered when agent begins speaking
  - Animation intensity at maximum
  - Animation pattern becomes dynamic and high activity
- **speaking** → **idle**: Triggered when agent finishes speaking
  - Animation intensity decreases to minimum
  - Animation pattern returns to subtle pulsing

## Visual State Mapping

### Agent State to Visual Properties
- **idle**:
  - Intensity: 0.1-0.3
  - Animation: Subtle pulsing
  - Color: Dim neon (cyan/magenta/purple)
  - Speed: Slow (0.5x)

- **listening**:
  - Intensity: 0.4-0.6
  - Animation: Reactive/moving patterns
  - Color: Medium neon intensity
  - Speed: Medium (1x)

- **processing**:
  - Intensity: 0.6-0.8
  - Animation: Pulse/loading pattern
  - Color: Bright neon
  - Speed: Medium-fast (1.2x)

- **speaking**:
  - Intensity: 0.8-1.0
  - Animation: High activity dynamic patterns
  - Color: Maximum neon intensity
  - Speed: Fast (1.5x)

## Component Interface

### Props
- **agentState** (required): Current state from useAgentSimulator hook
- **className** (optional): Additional CSS classes for styling
- **size** (optional): Visualizer size ('small', 'medium', 'large') - default: 'medium'
- **animationType** (optional): Type of visualization ('wave', 'bars', 'rings') - default: 'rings'

### Events
- **onStateChange**: Triggered when visualizer responds to agent state change
- **onAnimationComplete**: Triggered when animation sequence completes