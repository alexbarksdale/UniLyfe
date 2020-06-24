// Theme color for the sites
export const theme = {
    primary: '#6b7cff',
    darkPrimary: '#5f71f9',
    white: '#fff',
    shadow: '#e4e4e4',
    gray200: '#f3f3f3',
    gray300: '#e9e9e9',
    gray350: '#cecece',
    gray400: '#bbbbbb',
    gray450: '#9e9e9e',
    gray500: '#838383',
    gray600: '#595959',
    gray800: '#414042',
    divider: '#f1f1f1',
    error: '#ff7373',
    success: '#14ce4c',
};

// Screen sizes for devices
const size = {
    mobileXS: '392px',
    mobileS: '488px',
    mobileL: '590px',
    tabletS: '730px',
    tabletM: '786px',
    tabletL: '960px',
    laptopS: '1172px',
    laptopM: '1442px',
};

// Media queries
export const device = {
    mobileXS: `(max-width: ${size.mobileXS})`,
    mobileS: `(max-width: ${size.mobileS})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tabletS: `(max-width: ${size.tabletS})`,
    tabletM: `(max-width: ${size.tabletM})`,
    tabletL: `(max-width: ${size.tabletL})`,
    laptopS: `(max-width: ${size.laptopS})`,
    laptopM: `(max-width: ${size.laptopM})`,
};
