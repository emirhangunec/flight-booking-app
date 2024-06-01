interface BannerProps {
	height?: string
	children?: React.ReactNode
}

const Banner = ({ children, height = '100svh' }: BannerProps) => {
	return (
		<div
			className='max-w-[100svw] w-full lg:h-[75svh] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end'
			style={{
				height,
				background:
					'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("banner-image.png")',
			}}
		>
			{children}
		</div>
	)
}

export default Banner
