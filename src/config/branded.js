const brandedConfig = {
  eaton: {
    ctaComponent: require('./../components/EatonCta').default,
    footerComponent: require('./../components/EatonFooter').default,
    headerOverrides: {
      brandName: 'Eaton',
      fullLogo: require('./../assets/branded/logos/eatonFullLogo.svg'),
      partialLogo: require('./../assets/branded/logos/eatonFullLogo.svg'),
      inLinkLogo: require('./../assets/branded/logos/eatonInLinkLogo.svg'),
      logInOnly: false,
    },
    homePageComponent: require('./../pages/AboutEatonPage').default,
  },
  interface: {
    ctaComponent: require('./../components/InterfaceCta').default,
    footerComponent: require('./../components/InterfaceFooter').default,
    headerOverrides: {
      brandName: 'Interface',
      fullLogo: require('./../assets/branded/logos/interfaceLogo.png'),
      partialLogo: require('./../assets/branded/logos/interfaceLogo.png'),
      inLinkLogo: require('./../assets/branded/logos/interfaceInLinkLogo.png'),
      logInOnly: false,
    },
    homePageComponent: require('./../pages/AboutInterfacePage').default,
  },
}

export const getBrandedHostnamePrefix = () => {
  const availableHostnamePrefixes = Object.keys(brandedConfig)
  const currentHostnamePrefix = window.location.hostname.split('.')[0]
  return availableHostnamePrefixes.includes(currentHostnamePrefix)
    ? currentHostnamePrefix
    : null
}

export const getBrandedConfig = () => {
  const hostnamePrefix = getBrandedHostnamePrefix()
  return brandedConfig[hostnamePrefix]
}
