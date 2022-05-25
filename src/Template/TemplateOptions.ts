import {
    ISlideOptionsContext,
    SlideOptionsModule, VueInstance
} from "dynamicscreen-sdk-js";

export default class TemplateOptionsModule extends SlideOptionsModule {
    constructor(context: ISlideOptionsContext) {
        super(context);
    }

    async onReady() {
        return true;
    };

    onMounted() {
        console.log('onMounted weather OPTIONS')
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
        console.log('on updated')
    }

    // @ts-ignore
    setup(props: Record<string, any>, vue: VueInstance, context: ISlideOptionsContext) {
const en = require("/Users/nicolas/Desktop/DS/app-server/storage/apps//app-template-dynamicscreen/0.2.0/languages/en.json");
const fr = require("/Users/nicolas/Desktop/DS/app-server/storage/apps//app-template-dynamicscreen/0.2.0/languages/fr.json");
const translator: any = this.context.translator;
translator.addResourceBundle('en', 'template', en);
translator.addResourceBundle('fr', 'template', fr);
this.t = (key: string, namespace: string = 'template') => translator.t(key, {ns: namespace});

        const { h, onMounted, ref } = vue;

        const { Field, TextInput, Select } = this.context.components;
        const update = this.context.update;
        const templates = ref();
        console.log("MAJ")

        onMounted(() => {
            //@ts-ignore
            this.context.getTemplates().value.then((response) => {
                templates.value = []
                let arrayT: { name: string, key: string }[] = [];
                for (let template of response) {

                    let selectItem = {
                        name: template.name,
                        key: template.id.toString()
                    }
                    arrayT.push(selectItem);
                }
                templates.value = arrayT;
                console.log("TEMPLATE VALUE", templates.value)
            }).catch((err) => {
                console.log("ERROR", err);
            });
        })

        return () =>
          h(Select, {
              options: templates.value ? templates.value : [{name: "", key: ""}],
              placeholder: "Template",
              keyProp: 'key',
              valueProp: 'name',
              ...update.option("template_id")
          })
    }
}
