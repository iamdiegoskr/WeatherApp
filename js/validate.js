export const validateTitleWeather = (id) => {
    switch (true) {

        case (id >= 200 && id <= 232):
            {
                return "Tormenta"
            }
        case (id >= 300 && id <= 321):
            {
                return "Llovizna"
            }
        case (id >= 500 && id <= 531):
            {
                return "Lluvia"
            }
        case (id >= 600 && id <= 622):
            {
                return "Nieve"
            }
        case (id >= 700 && id <= 781):
            {
                return "Atmosfera"
            }
        case (id == 800):
            {
                return "Hermoso cielo"
            }
        case (id > 800 && id <= 804):
            {
                return "Nuboso"
            }

    }
}

export const capitalizeStrings = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const convertCountryName = (country) => {
    let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(country)
}