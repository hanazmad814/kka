export function DesktopPreviewFrame({ html }: { html: string }) { return <iframe title='desktop-preview' style={{ width: '100%', minHeight: 400 }} srcDoc={html} />; }
