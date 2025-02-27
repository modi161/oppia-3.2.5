// Copyright 2017 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Component for the solution editor.
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import { StateCustomizationArgsService } from 'components/state-editor/state-editor-properties-services/state-customization-args.service';
import { EditabilityService } from 'services/editability.service';
import { ExplorationHtmlFormatterService } from 'services/exploration-html-formatter.service';
import { StateInteractionIdService } from 'components/state-editor/state-editor-properties-services/state-interaction-id.service';
import { StateSolutionService } from 'components/state-editor/state-editor-properties-services/state-solution.service';
import { Solution } from 'domain/exploration/SolutionObjectFactory';

interface ExplanationFormSchema {
  type: string;
  ui_config: object;
}

@Component({
  selector: 'oppia-solution-editor',
  templateUrl: './solution-editor.component.html'
})
export class SolutionEditor implements OnInit {
  @Output() saveSolution: EventEmitter<Solution> = new EventEmitter();
  @Output() showMarkAllAudioAsNeedingUpdateModalIfRequired:
    EventEmitter<string[]> = new EventEmitter();

  @Output() openSolutionEditorModal: EventEmitter<void> = new EventEmitter();

  isEditable: boolean;
  EXPLANATION_FORM_SCHEMA: ExplanationFormSchema;

  constructor(
    private editabilityService: EditabilityService,
    private explorationHtmlFormatterService: ExplorationHtmlFormatterService,
    private stateCustomizationArgsService: StateCustomizationArgsService,
    private stateInteractionIdService: StateInteractionIdService,
    private stateSolutionService: StateSolutionService,
  ) {}

  getAnswerHtml(): string {
    return this.explorationHtmlFormatterService.getAnswerHtml(
      this.stateSolutionService.savedMemento.correctAnswer as string,
      this.stateInteractionIdService.savedMemento,
      this.stateCustomizationArgsService.savedMemento);
  }

  updateNewSolution(value: Solution): void {
    this.saveSolution.emit(value);
  }

  openMarkAllAudioAsNeedingUpdateModalIfRequired(value: string[]): void {
    this.showMarkAllAudioAsNeedingUpdateModalIfRequired.emit(value);
  }

  openEditorModal(): void {
    this.openSolutionEditorModal.emit();
  }

  ngOnInit(): void {
    this.isEditable = this.editabilityService.isEditable();

    this.EXPLANATION_FORM_SCHEMA = {
      type: 'html',
      ui_config: {}
    };
  }
}

angular.module('oppia').directive('oppiaSolutionEditor',
  downgradeComponent({
    component: SolutionEditor
  }) as angular.IDirectiveFactory);
