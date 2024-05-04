'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-demo documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DemoModule.html" data-type="entity-link" >DemoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DemoModule-9680f0582543a7cb454f7091e5cc4a62800d3a3753312e433dcb6fa3f4de5414bdd0a90b790e592c8ea3e1a34a28261338ba87bef5b2dc0b76c14e4beb05885b"' : 'data-bs-target="#xs-controllers-links-module-DemoModule-9680f0582543a7cb454f7091e5cc4a62800d3a3753312e433dcb6fa3f4de5414bdd0a90b790e592c8ea3e1a34a28261338ba87bef5b2dc0b76c14e4beb05885b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DemoModule-9680f0582543a7cb454f7091e5cc4a62800d3a3753312e433dcb6fa3f4de5414bdd0a90b790e592c8ea3e1a34a28261338ba87bef5b2dc0b76c14e4beb05885b"' :
                                            'id="xs-controllers-links-module-DemoModule-9680f0582543a7cb454f7091e5cc4a62800d3a3753312e433dcb6fa3f4de5414bdd0a90b790e592c8ea3e1a34a28261338ba87bef5b2dc0b76c14e4beb05885b"' }>
                                            <li class="link">
                                                <a href="controllers/DemoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DemoController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelloModule.html" data-type="entity-link" >HelloModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HelloModule-28b29117a99e8bb81e8ca4913f8a727f163ff89815ad6ba94bfbbc342a117dfb788250e89c32b8ec5f58523920f9c952c108346d000a280d4555ec8bdb26a9c3"' : 'data-bs-target="#xs-controllers-links-module-HelloModule-28b29117a99e8bb81e8ca4913f8a727f163ff89815ad6ba94bfbbc342a117dfb788250e89c32b8ec5f58523920f9c952c108346d000a280d4555ec8bdb26a9c3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HelloModule-28b29117a99e8bb81e8ca4913f8a727f163ff89815ad6ba94bfbbc342a117dfb788250e89c32b8ec5f58523920f9c952c108346d000a280d4555ec8bdb26a9c3"' :
                                            'id="xs-controllers-links-module-HelloModule-28b29117a99e8bb81e8ca4913f8a727f163ff89815ad6ba94bfbbc342a117dfb788250e89c32b8ec5f58523920f9c952c108346d000a280d4555ec8bdb26a9c3"' }>
                                            <li class="link">
                                                <a href="controllers/HelloController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelloController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});