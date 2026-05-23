export function MobilePreviewFrame({ html }: { html: string }) { return <iframe title='mobile-preview' style={{ width: 320, minHeight: 568 }} srcDoc={html} />; }
