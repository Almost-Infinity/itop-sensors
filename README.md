# ITOP Sensors

A system receives data from 4 sensors: A, B, C, D  and displays the latest values inside a single ‘view object’ in a dashboard. Each sensor sends randomly data every 200-1500ms.

#### REQUIREMENTS:
- View object must not be rendered more often than every 200ms — `✓`
- View object must only be rendered when one of the systems sends a new value — `✓`
- If a specific sensor is not sending data for 1500ms, its value (in the view object) should be ‘no data’ — `✓`
- All 4 sensors must emit at least one value before the first “view object” is ever displayed on the dashboard. — `✓`

#### DELIVERABLES:
- provide a basic UI in react — `✓`
- you MUST use RXJS — `✓`
- provide unit tests and basic component tests

#### Nota Bene:
- you do not need to implement a backend. You can emulate the random data straight inside you React application by using an EventEmitter or other RXJS syntax.
- this exercise is about RXJS; you need to use it.
- you MUST write unittests for your observable and other small parts of your code.

`✓` *— DONE*
