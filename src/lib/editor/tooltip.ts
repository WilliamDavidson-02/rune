export const getTooltipIconCss = (className: string, url: string) => {
	return `
    	${className} {
			background-image: url(${url});
			background-size: contain;
			background-repeat: no-repeat;
		}

    `
}
