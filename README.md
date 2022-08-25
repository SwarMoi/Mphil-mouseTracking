# Mphil-mouseTracking

DIR Structure

```
|-- README.md
|-- Analysis
|   |-- data
|   |-- output
|   |-- raw
|   -- 1_Parse_PCI-data.Rmd
|   -- 2_Mouse-data-preprocessing-PCIbex.Rmd
|   -- 3_Mouse-tracking-analysis.Rmd
|   -- references.txt
|-- Experiment
|    |-- PCIbex-Farm
|    |   |-- chunk_includes
|    |   |-- css_includes
|    |   |-- clientserver.mshi
|    |   |-- data_includes
|    |   |-- js_includes
|    |   
|    |-- stimuli
|    |   |-- audio_64kbps
|    |   |-- stimuli-images
|    |   -- items.csv
```

**Experiment** contains both the audio and text stimuli files
**Analysis** contains the following Rmd files
- 1_Parse_PCI-data.Rmd => Parses PCIbex farm output files to workable csv's
- 2_Mouse-data-preprocessing-PCIbex.Rmd => Converts xpos and ypos and timeframes to respective columns
- 3_Mouse-tracking-analysis.Rmd => Statistical analysis of Mouse-tracking

Demonstration link : **https://farm.pcibex.net/r/fhWXUf/**