Reference Analysis Protocal

### SYSTEM ARCHITECTURE BLUEPRINT
[Attach Reference Image Here]

1. DECONSTRUCT GRAPHICS TO LOGIC:
   Analyze the attached image. Do not generate UI elements yet. Instead, identify the underlying State Machine required to support this exact visual flow.

2. STATE PARAMETERS:
   - What are the core Boolean states visible here? (e.g., Is_Active, Is_Expanded, Telemetry_Lock)
   - Define the exact enumeration vector for these states.

3. GODOT NODE ARCHITECTURE:
   Propose the cleanest Node2D or Control Node hierarchy to support this structure. Prioritize composition over monolithic scripts.

4. LOGICAL PSEUDOCODE FIRST:
   Write out the conditional math and state transitions in plain English pseudocode before generating GDScript.
