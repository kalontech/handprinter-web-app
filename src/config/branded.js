const brandedConfig = {
  eaton: {
    ctaComponent: require('./../components/EatonCta').default,
    footerComponent: require('./../components/EatonFooter').default,
    headerOverrides: {
      brandName: 'Eaton',
      fullLogo: require('./../assets/branded/logos/eatonFullLogo.png'),
      partialLogo: require('./../assets/branded/logos/eatonFullLogo.png'),
      inLinkLogo: require('./../assets/branded/logos/eatonInLinkLogo.svg'),
    },
    homePageComponent: require('./../pages/AboutEatonPage').default,
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
