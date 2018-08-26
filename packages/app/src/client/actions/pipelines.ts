import { Action } from 'redux';

export type Actions =
  | RunTopPagePipeline
  | RunTopPagePipelineSuccess
  | RunTopPagePipelineFailure
  | RunOwnerPagePipeline
  | RunOwnerPagePipelineSuccess
  | RunOwnerPagePipelineFailure;

export interface RunTopPagePipeline extends Action {
  type: 'RUN_TOP_PAGE_PIPELINE';
}

export const runTopPagePipeline = (): RunTopPagePipeline => ({
  type: 'RUN_TOP_PAGE_PIPELINE'
});

export interface RunTopPagePipelineSuccess extends Action {
  type: 'RUN_TOP_PAGE_PIPELINE_SUCCESS';
}

export const runTopPagePipelineSuccess = (): RunTopPagePipelineSuccess => ({
  type: 'RUN_TOP_PAGE_PIPELINE_SUCCESS'
});
export interface RunTopPagePipelineFailure extends Action {
  type: 'RUN_TOP_PAGE_PIPELINE_FAILURE';
}

export const runTopPagePipelineFailure = (): RunTopPagePipelineFailure => ({
  type: 'RUN_TOP_PAGE_PIPELINE_FAILURE'
});

export interface RunOwnerPagePipeline extends Action {
  type: 'RUN_OWNER_PAGE_PIPELINE';
  payload: {
    owner: string;
  };
}

export const runOwnerPagePipeline = (owner: string): RunOwnerPagePipeline => ({
  type: 'RUN_OWNER_PAGE_PIPELINE',
  payload: {
    owner
  }
});

export interface RunOwnerPagePipelineSuccess extends Action {
  type: 'RUN_OWNER_PAGE_PIPELINE_SUCCESS';
}

export const runOwnerPagePipelineSuccess = (): RunOwnerPagePipelineSuccess => ({
  type: 'RUN_OWNER_PAGE_PIPELINE_SUCCESS'
});
export interface RunOwnerPagePipelineFailure extends Action {
  type: 'RUN_OWNER_PAGE_PIPELINE_FAILURE';
}

export const runOwnerPagePipelineFailure = (): RunOwnerPagePipelineFailure => ({
  type: 'RUN_OWNER_PAGE_PIPELINE_FAILURE'
});
