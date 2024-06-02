const Footer = () => {
	return (
		<div className='w-full bg-[#1F2227] text-white  lg:py-16 lg:px-24 lg:pt-12'>
			<div className='flex flex-col max-lg:items-center '>
				<div className='flex flex-col gap-4 pb-6 lg:pb-12 lg:flex-row max-lg:justify-stretch lg:justify-between'>
					<div className='flex flex-col gap-4 p-4'>
						<img
							src='/logo.png'
							alt=''
							className='object-contain w-20 h-20'
						/>
						<p className='text-sm font-medium opacity-75 max-w-72'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis
							voluptatem necessitatibus repellendus, suscipit
						</p>
						<div className=''>
							<div className='flex gap-4'>
								<a
									className='p-2 px-4 transition-all duration-150 border rounded-full hover:bg-white hover:text-black'
									href=''
								>
									f
								</a>
								<a
									className='p-2 px-[13px] border rounded-full hover:bg-white hover:text-black transition-all duration-150'
									href=''
								>
									in
								</a>
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-8 p-4 lg:gap-20 lg:justify-center lg:flex-row'>
						<div className='flex flex-col gap-2'>
							<h1 className='text-lg font-semibold'>About</h1>
							<a
								className='opacity-75'
								href=''
							>
								About Us
							</a>
							<a
								className='opacity-75'
								href=''
							>
								Contact Us
							</a>
							<a
								className='opacity-75'
								href=''
							>
								Careers
							</a>
						</div>
						<div className='flex flex-col gap-2'>
							<h1 className='text-lg font-semibold'>Help</h1>
							<a
								className='opacity-75'
								href=''
							>
								FAQ
							</a>
							<a
								className='opacity-75'
								href=''
							>
								Help Center
							</a>
							<a
								className='opacity-75'
								href=''
							>
								Privacy Policy
							</a>
						</div>
						<div className='flex flex-col gap-2'>
							<h1 className='text-lg font-semibold'>About</h1>
							<a
								className='opacity-75'
								href=''
							>
								About Us
							</a>
							<a
								className='opacity-75'
								href=''
							>
								Contact Us
							</a>
							<a
								className='opacity-75'
								href=''
							>
								Careers
							</a>
						</div>
					</div>
				</div>
				<div className='w-full h-px bg-white/20'></div>
				<ul className='flex items-center justify-center gap-4 p-5 lg:pb-0 lg:pt-14'>
					<li>
						<a href=''>Terms</a>
					</li>
					<li>
						<a href=''>Cookies</a>
					</li>
					<li>
						<a href=''>Privacy</a>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Footer
