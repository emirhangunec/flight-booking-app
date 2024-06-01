import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)

	const MENU_ITEMS = [
		{
			label: 'Anasayfa',
			link: '#',
			active: true,
		},
		{
			label: 'Hakkımızda',
			link: '#',
			active: false,
		},
		{
			label: 'Oteller',
			link: '#',
			active: false,
		},
		{
			label: 'Uçak Bileti',
			link: '#',
			active: false,
		},
		{
			label: 'Blog',
			link: '#',
			active: false,
		},
	]
	return (
		// wrapper
		<div className='fixed flex items-center justify-center z-50 w-full top-0 left-0 right-0  lg:px-20 lg:pt-5 p-0'>
			{/* container */}
			<div className='w-full max-w-screen-2xl  bg-gradient-to-br from-[#EAF0F0]/30 to-[#EAF0F0]/20 lg:rounded-xl  backdrop-blur-md p-3 '>
				<div className='w-full flex items-center justify-between gap-5'>
					{/* logo */}
					<div className='py-2 lg:py-4'>
						<img
							src='logo.png'
							alt=''
						/>
					</div>
					{/* desktop navbar */}
					<nav className='max-lg:hidden w-[75%] flex-1 flex items-center justify-center'>
						<ul className='flex  items-center justify-center'>
							{MENU_ITEMS.map((item) => (
								<li key={item.label}>
									<a
										href={item.link}
										className={cn(
											'tracking-wider text-[#283841] xl:px-5 p-2 transform transition-all duration-300 hover:scale-105 hover:text-[#283841] hover:font-bold',
											item.active ? 'text-[#283841] font-bold' : ''
										)}
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
					{/* desktop cta */}
					<div className='max-lg:hidden flex gap-2 items-center justify-center'>
						<Button
							size='lg'
							variant='ghost'
							className='hover:bg-transparent hover:backdrop-blur-md'
						>
							Giriş Yap
						</Button>
						<Button
							size='lg'
							variant='primary'
						>
							Kayıt Ol
						</Button>
					</div>
					{/* mobile menu trigger */}

					<button
						className='lg:hidden'
						onClick={toggleMobileMenu}
					>
						<Menu size={28} />
					</button>
				</div>
				{/* mobile menu */}
				<div
					className={cn(
						'transition-all  duration-300 h-full overflow-hidden',
						isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
					)}
				>
					<nav className='w-full flex-1 flex py-4 items-center justify-center'>
						<ul className='flex flex-col gap-2  items-center w-full justify-center'>
							{MENU_ITEMS.map((item) => (
								<li key={item.label}>
									<a
										href={item.link}
										className={cn(
											'tracking-wider w-full text-[#283841] transform transition-all duration-300 hover:scale-105 hover:text-[#283841] hover:font-bold',
											item.active ? 'text-[#283841] font-bold' : ''
										)}
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Header
