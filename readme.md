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

### Images - AceHealth
![page_01](https://github.com/AceContra/AceHealth/assets/42494649/aa43ee4f-4a7f-4298-b407-7c601a8833f5)
![page_02](https://github.com/AceContra/AceHealth/assets/42494649/b76133f7-386a-43f3-8bdf-8e5c066009bb)
![page_03](https://github.com/AceContra/AceHealth/assets/42494649/7807ec00-fdca-4f3a-9a6c-5a5b1f0a7294)
