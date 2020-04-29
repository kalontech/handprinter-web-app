import colors from 'config/colors'

export const brandedConfig = {
  eaton: {
    brandName: 'Eaton',
    homePageComponent: require('./../pages/HomePage').default,
  },
  interface: {
    brandName: 'Interface',
    ctaComponent: require('./../components/InterfaceCta').default,
    footerComponent: require('./../components/InterfaceFooter').default,
    headerOverrides: {
      fullLogo: require('./../assets/branded/logos/interfaceLogo.png'),
      partialLogo: require('./../assets/branded/logos/interfaceLogo.png'),
      inLinkLogo: require('./../assets/branded/logos/interfaceInLinkLogo.png'),
      logInOnly: true,
      brandColor: colors.interfaceFooterColor2,
      fontNames: '"Helvetica Neue", sans-serif',
      fontColor: colors.interfaceColor,
    },
    homePageComponent: require('./../pages/AboutInterfacePage').default,
  },
  humanscale: {
    brandName: 'Humanscale',
    ctaComponent: require('./../components/HumanscaleCta').default,
    headerOverrides: {
      fullLogo: require('./../assets/branded/logos/humanscaleLogo.png'),
      partialLogo: require('./../assets/branded/logos/humanscaleLogoMobile.svg'),
      inLinkLogo: require('./../assets/branded/logos/humanscaleLogo.png'),
      logInOnly: true,
      brandColor: colors.green,
      fontNames: '"Helvetica Neue", sans-serif',
      fontColor: colors.interfaceColor,
    },
    homePageComponent: require('./../pages/AboutHumanscalePage').default,
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
