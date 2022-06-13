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
            $template = $slide->getTemplate();
        }

        dd($template);

        $this->addSlide([
            "template" => $template
        ]);
    }
}