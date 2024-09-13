export const b64toBlob = (
	b64Data: any,
	contentType: string,
	sliceSize: number,
	fileName?: string
) => {
	contentType = contentType || ''
	sliceSize = sliceSize || 512

	const byteCharacters = atob(b64Data)
	const byteArrays = []

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize)

		const byteNumbers = new Array(slice.length)
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i)
		}

		const byteArray = new Uint8Array(byteNumbers)

		byteArrays.push(byteArray)
	}

	const blob = new File(byteArrays, fileName ?? '', { type: contentType })
	return blob
}

export const downloadFile = (fileName: string, fileBase64: string) => {
	const [contentType, b64Data] = fileBase64.split(',')
	const blob = b64toBlob(
		b64Data,
		contentType.replace('data:', ''),
		512,
		fileName
	)
	const blobUrl = URL.createObjectURL(blob)

	const link = document.createElement('a')
	link.setAttribute('href', fileName ? fileBase64 : blobUrl)
	link.setAttribute('target', '_blank')
	if (!!fileName) {
		link.setAttribute('download', fileName)
	}
	document.body.appendChild(link)
	link.click()
	URL.revokeObjectURL(blobUrl)
	document.body.removeChild(link)
}
