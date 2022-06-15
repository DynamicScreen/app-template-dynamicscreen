<?php

namespace DynamicScreen\Template\Template;

use DynamicScreen\SdkPhp\Handlers\SlideHandler;
use DynamicScreen\SdkPhp\Interfaces\ISlide;

class TemplateHandler extends SlideHandler
{
    public function fetch(ISlide $slide): void
    {
        $templateAccessKey = $this->needed_templates();

        if (is_array($templateAccessKey)) {
            $templateData = $slide->getTemplate();
            $template = $templateData["template"];
            $amplitude = $templateData["amplitude"];
            $objectsArray = $templateData["objectsArray"];

            $datasource = null;
            $sources = [];

            foreach ($template["objects"] as $obj) {
                if (array_key_exists('text', $obj['properties']) && $obj['properties']['text']['__type'] == 'datasource') {
                    array_push($sources, $obj['properties']['text']['datasource']);
                }
            }

            foreach ($objectsArray as $objects) {
                $this->addSlide([
                    "canvas" => $template["canvas"],
                    "objects" => $objects
                ]);
            }
        }
    }
}