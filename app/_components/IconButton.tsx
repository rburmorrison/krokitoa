import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

type IconButtonProps = {
	icon: LucideIcon;
	ariaLabel: string;
	onClick: () => void;
	disabled?: boolean;
};

export default function IconButton({
	icon: Icon,
	ariaLabel,
	onClick,
	disabled = false,
}: IconButtonProps) {
	return (
		<Button
			size="icon"
			variant="ghost"
			aria-label={ariaLabel}
			onClick={onClick}
			disabled={disabled}
		>
			<Icon />
		</Button>
	);
}
