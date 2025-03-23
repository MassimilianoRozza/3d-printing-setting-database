# 3D Printing Settings Database

A web-based database of 3D printing settings for various materials and printers. This project aims to help the 3D printing community by providing a centralized, searchable collection of tested printing parameters.

> ⚠️ **IMPORTANT DISCLAIMER**
> 
> These settings are provided as-is, without any warranty, expressed or implied. All settings are user-contributed and may not work with your specific setup.
> 
> - Always test with small prints first
> - Adjust parameters according to your setup
> - Different printer configurations may require different settings
> - Environmental conditions can affect optimal settings
> - Use these settings as a starting point, not definitive values

## Features

- 🔍 Filter settings by printer, material type, and manufacturer
- 📊 Comprehensive material data including:
  - Temperature settings (nozzle and bed)
  - Flow rates and pressure advance
  - Maximum volumetric speeds
  - Retraction settings
- ✅ Testing status indicators
- 🌙 Dark mode support
- 📱 Responsive design

## Usage

Visit [the site](https://massimilianorozza.github.io/3d-printing-setting-database/) to access the database. Use the filters to find settings for your specific:
- Printer model
- Material type (PLA, PETG, etc.)
- Manufacturer

## Contributing

### Adding New Settings

1. Fork this repository
2. Edit pr create a the JSON file in the appropriate manufacturer directory:
```
ManufacturerName/ManufacturerName_MaterialType.json
```

3. Use this template for your settings:
```json
[
    {
        "printer": "Your Printer Model",
        "manufacturer": "Filament Manufacturer",
        "material": "Material Type",
        "color": "Filament Color",
        "diameter_mm": 1.75,
        "density_g_cm3": 0.00,
        "nozzle_temp_first_layer_c": 0,
        "nozzle_temp_c": 0,
        "bed_type": "Your Bed Surface",
        "bed_temp_first_layer_c": 0,
        "bed_temp_c": 0,
        "flowrate": 0.00,
        "pressure_advance": 0.00,
        "max_mm3_s": 0,
        "retraction_mm": 0.0,
        "tested": "✅"
    }
]
```

### Testing Status

Use these indicators for the "tested" field:
- ✅ Fully tested and verified
- ⚠️ Partially tested
- 🔄 Currently testing
- ❌ Not tested yet

### Code Contributions

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally using Live Server
5. Submit a pull request

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/3d-printing-setting-database.git
```

2. Install VS Code Live Server extension
3. Open the project in VS Code
4. Right-click on `index.html` and select "Open with Live Server"

## License

MIT License

Copyright (c) 2025 MassimilianoRozza

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

The software is provided "as is", without warranty of any kind. For more details about permissions and restrictions, please see the full license text.

## Acknowledgments

Thanks to all contributors who share their printing settings and help improve this database.