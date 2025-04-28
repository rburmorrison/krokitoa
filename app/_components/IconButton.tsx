import type React from "react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

type IconButtonProps = {
	icon: LucideIcon;
	ariaLabel: string;
	onClick: () => void;
	disabled?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({
	icon: Icon,
	ariaLabel,
	onClick,
	disabled = false,
}) => {
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
};

export default IconButton;
