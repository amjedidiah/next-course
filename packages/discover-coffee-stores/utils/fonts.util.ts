import localFont from '@next/font/local'

const fonts = localFont({
  src: [
    {
      path: '../public/fonts/IBMPlexSans-Regular.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/IBMPlexSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

export default fonts
