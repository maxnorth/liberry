export var TemplateUrls = {
    PatternLibrary: "src/app/templates/PatternLibraryRoot.html"
};

export var PatternLibrary = {
    "banners": ["banner1", "banner2"],
    "templates": ["template1" ]
};

//should the sort be associated with the iterable or the thing being iterated on

export var IterablesConfig = {
    'railItems': {
        sort: []
    }
};

export var Iterables = {
    'railItems': `
        <div>
            Here is your railItem called {{i.name}}
        </div>
    `
};