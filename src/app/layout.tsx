import StyledProviders from '@/provider/StyledProviders'
import GlobalStyles from '@/styles/GlobalStyles'

export default function RootLayout({children} : { children: any }) {
  return (
    <StyledProviders>
      <GlobalStyles />
      {children}
    </StyledProviders>
  )
}