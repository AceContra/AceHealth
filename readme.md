# Ace Health
 AceHealth consolidates comprehensive medical records, including medication history and real-time vital signs data like respiration and pulses. Patients can securely share this information with hospitals and doctors, facilitating tailored treatment plans for optimal healthcare outcomes.

### Structure (src)
```
+--> AceHealthApp (Electron Desktop App)
|    |
|    +--> frontend (React Application For Front End)
|    +--> index.js
|         ( run npm start to start the electron application
|         it is hardcoded to be in development mode & so
|         it won't show the build. it shows only the live
|         development react web app into the js application )
|
+--> HospitalServer (BE Servers That Run In Each Hospital)
|    |
|    +--> schemas (patientSchema)
|    +--> Utils (Database, Logger)
|
+--> AceHealthServer (Main Server) [Not Implemented]
```

### Todo For Now!! (DeadLine: 26/03/2024)
- add patient creation page
- handle patient creation post request
- visualize the patient details
- live simulation data of patient 
