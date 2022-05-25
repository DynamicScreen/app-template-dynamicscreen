<?php

namespace DynamicScreen\Template\Template;

use DynamicScreen\SdkPhp\Handlers\SlideHandler;
use DynamicScreen\SdkPhp\Interfaces\ISlide;

class TemplateHandler extends SlideHandler
{
    public function fetch(ISlide $slide): void
    {
        $this->addSlide([
            'template' => $slide->getOption('title', ""),
        ]);
    }
}