import {
    BaseContext,
    AssetDownload,
    IAssetsStorageAbility,
    IGuardsManager,
    ISlideContext,
    IPublicSlide,
    SlideModule,
    SignalDispatcher
} from "dynamicscreen-sdk-js";

import {
    ConcreteComponent,
    defineComponent,
    DefineComponent,
    onMounted,
    reactive,
    Ref,
    ref,
    resolveComponent,
    VNode
} from 'vue';
import i18next from "i18next";
import { h } from "vue"

const en = require("../../../languages/en.json");
const fr = require("../../../languages/fr.json");

export default class TemplateSlideModule extends SlideModule {
    constructor(context: ISlideContext) {
        super(context);
    }

    trans(key: string) {
        return i18next.t(key);
    };

    async onReady() {
        try {
            const ability: IAssetsStorageAbility = await this.context.assetsStorage()
            for (let object of this.context.slide.data.objects) {
                if (object.type === "image" || object.type === "video") {
                    await ability.download(object.properties.media.url)
                }
            }
            return true;
        } catch (err) {
            return false
        }
    };

    onMounted() {
        console.log('onMounted')
    }

    //@ts-ignore
    onErrorTracked(err: Error, instance: Component, info: string) {
    }

    //@ts-ignore
    onRenderTriggered(e) {
    }

    //@ts-ignore
    onRenderTracked(e) {
    }

    onUpdated() {
    }

    initI18n() {
        i18next.init({
            fallbackLng: 'en',
            lng: 'fr',
            resources: {
                en: { translation: en },
                fr: { translation: fr },
            },
            debug: true,
        }, (err, t) => {
            if (err) return console.log('something went wrong loading translations', err);
        });
    };

    // @ts-ignore
    setup(props, ctx) {

        const slide = reactive(props.slide) as IPublicSlide;
        this.context = reactive(props.slide.context);

        const onPrepare = new SignalDispatcher();
        const onPlay = new SignalDispatcher();
        const onEnded = new SignalDispatcher();

        this.context.template.provideTemplateContext({
            onPrepare: onPrepare.asEvent(),
            onPlay: onPlay.asEvent(),
            onEnded: onEnded.asEvent()
        });

        this.context.onPrepare(async () => {
            onPrepare.dispatch();
        });

        this.context.onReplay(async () => {
        });

        this.context.onPlay(async () => {
            onPlay.dispatch();
        });

        // this.context.onPause(async () => {
        //   console.log('Message: onPause')
        // });

        this.context.onEnded(async () => {
            onEnded.dispatch();
        });

        return () =>
            h(this.context.template.component, {
                data: this.context.slide.data
            })
    }
}