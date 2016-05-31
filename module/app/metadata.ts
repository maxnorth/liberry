
//alternative
export var library { 
    patterns: {
        name: "patterns",
        title: "Patterns",
        path: "patterns",
        items: {
            "banners": {
                name: "banners",
                title: "Banners",
                path: "patterns/banners"
                items: {
                    "banner1": { 
                        name: "banner1",
                        title: "Banner 1",
                        path: "patterns/banners/banner1",
                        html: `
                            <span>test1!!!!</span>
                        `
                    },
                    "banner2": { 
                        name: "banner2",
                        title: "Banner 2",
                        path: "patterns/banners/banner2",
                        html: `
                            <span>hey, here's a banner</span>
                        `
                    }
                }
            },
            "dialogs": {
                name: "dialogs",
                title: "Dialogs",
                path: "patterns/dialogs"
            },
            "style-guide": {
                name: "style-guide",
                title: "Style Guide",
                path: "patterns/style-guide",
                items: {
                    "colors": {
                        name: "colors",
                        title: "Colors",
                        path: "patterns/style-guide/colors",
                        items: {
                            "primary": {
                                name: "primary",
                                title: "Primary",
                                path: "patterns/style-guide/colors/primary",
                                items: {
                                    "primary-dark": {
                                        name: "primary-dark",
                                        title: "Primary Dark",
                                        path: "patterns/style-guide/colors/primary/primary-dark",
                                        Hex: "#5CA156",
                                        RGB: "92 161 86"
                                    },
                                    "primary-darker": {
                                        name: "primary-darker",
                                        title: "Primary Darker",
                                        path: "patterns/style-guide/colors/primary/primary-darker",
                                        Hex: "#528F4D",
                                        RGB: "82 143 77"
                                    },
                                    "primary": {
                                        name: "primary",
                                        title: "Primary",
                                        path: "patterns/style-guide/colors/primary/primary",
                                        Hex: "#66B360",
                                        RGB: "102 179 96"
                                    }
                                }
                            },
                            "secondary": {
                                name: "secondary",
                                title: "Secondary",
                                path: "patterns/style-guide/colors/secondary",
                                items: {
                                    "background-dark": {
                                        name: "background-dark",
                                        title: "Background Dark",
                                        path: "patterns/style-guide/colors/secondary/background-dark",
                                        Hex: "#000000",
                                        RGB: "0 0 0"
                                    },
                                    "background-light": {
                                        name: "background-light",
                                        title: "Background Light",
                                        path: "patterns/style-guide/colors/secondary/background-light",
                                        Hex: "#DDDDDD",
                                        RGB: "221 221 221"
                                    },
                                    "background-lighter": {
                                        name: "background-lighter",
                                        title: "Background Lighter",
                                        path: "patterns/style-guide/colors/secondary/background-lighter",
                                        Hex: "#EEEEEE",
                                        RGB: "238 238 238"
                                    }
                                }
                            }
                        }
                    }
                },
                "icons": {
                    name: "icons",
                    title: "Icons",
                    path: "patterns/style-guide/icons",
                    items: {
                        "account": {
                            name: "account",
                            title: "Account",
                            path: "patterns/style-guide/icons/account",
                            
                        }
                    }
                }
            }
        }
    },
    templates: {
        _name: "templates",
        _title: "Templates"
    },
    sorters: {
        
    }
}

export var site = {
    pages: {
        index: {
            path: "index",
            template: `
                <span>here's your page</span>
            `
        },
        readme: {
            path: "readme",
            template: `
                <span>here's your page</span>
            `
        }
    },
    repeaters: {
        pattern: {
            name: "pattern",
            title: "Pattern"
            template: `
                <p>Pattern example - Title: {{title}}, Name: {{name}}</p>
            `
        },
        navRail: {
            name: "navRail",
            title: "Nav Rail",
            template: `
                <li><a href="#{{name}}">{{title}}</a></li>
            `
        },
        colors: {
            name: "colors",
            title: "Colors",
            template: `
                <section class="{{name}}-colors">
                	<h3>{{title}} Colors</h3>
                	<hr>
                	<div class="color-wrapper">
                		<template repeater="colorCards"></template>
                	</div>
                </section>
            `
        },
        colorCards: {
            name: "colorCards",
            title: "Color Cards",
            template: `
                <div class="color-card">
                	<div class="brand {{name}}"></div>
                	<p>Hex: {{Hex}}</p>
                	<p>RGB: {{RGB}}</p>
                	<p>SCSS: $brand-{{name}}</p>
                </div>
            `
        },
        icons: {
            name: "icons",
            title: "Icons",
            template: `
                <div class="icon-preview">
                	<h4>{{title}}</h4>
                	<i class="exc-icon-{{name}}"></i>							
                	<pre><code><i class="exc-icon-{{name}}"></i></code></pre>
                </div>
            `
        }
    },
    templates: {
        main: {
            name: "main",
            template: `
                <div>
                    <div>
                        main content
                    </div>
                    <content></content>
                </div>
            `
        },
        patternDisplay: {
            name: "patternDisplay",
            template: `
                <template name="main">
                    <markdown content="library.patterns/{{url.hash}}"></markdown>
                    <repeater name="pattern"></repeater>
                </template>
            `
        },
    }
}