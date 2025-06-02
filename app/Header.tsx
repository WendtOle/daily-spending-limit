"use client";
import { FaCog } from "react-icons/fa";
import { ModalType } from "./modal/Modals";

export const Header = () => {


	const openSettingsButtonProps = {
		popoverTarget: ModalType.SETTING,
	};
	return (
		<div className="border-b-2 h-12 w-full flex justify-center items-center shadow-sm bg-white">
			<div className="uppercase font-lg">
				Daily spending limit
			</div>
			<button className="absolute right-4" {...openSettingsButtonProps} >
				<FaCog size={20} className="text-slate-600" />
			</button>
		</div>
	)
}

