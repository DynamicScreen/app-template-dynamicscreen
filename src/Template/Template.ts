import {
  IAssetsStorageAbility,
  ISlideContext,
  IPublicSlide,
  SlideModule, VueInstance
} from "dynamicscreen-sdk-js";

export default class TemplateSlideModule extends SlideModule {
    constructor(context: ISlideContext) {
        super(context);
    }

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

    // @ts-ignore
    setup(props: Record<string, any>, vue: VueInstance, context: ISlideContext) {
        const { h, ref, reactive, computed } = vue;
        const slide = reactive(props.slide) as IPublicSlide;
        this.context = reactive(props.slide.context);

        this.context.onPrepare(async () => {

        });

        this.context.onReplay(async () => {
        });

        this.context.onPlay(async () => {

        });

        // this.context.onPause(async () => {
        //   console.log('Message: onPause')
        // });

        this.context.onEnded(async () => {

        });

        return () =>
            h(this.context.template!.component, {
                canvas: this.context.slide.data.canvas,
                widgets: this.context.slide.data.objects,
                duration: this.context.slide.duration,
                isZoning: false
            })
    }
}
