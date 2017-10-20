export const INPUT_ATTRIBUTES = {
  DESC_IMAGE: {
    class: 'input-image',
    type: 'file',
    accept: 'image/*',
    src: '../../../assets/default-placeholder.png',
    placeholder: 'Select an image from your device',
    title: 'Click to select an image',
    'prop-name': 'mainImage'
  },
  NAME: {
    class: 'mat-input-element input-name',
    type: 'text',
    placeholder: 'Project title',
    title: 'Type in the project title',
    'prop-name': 'projectName'
  },
  PROJECT_ID: {
    class: 'mat-input-element input-proj-id',
    type: 'text',
    placeholder: 'Project id',
    title: 'Type in the corresponding project id',
    'prop-name': 'projectId'
  },
  MANAGER: {
    class: 'mat-input-element input-proj-manager',
    type: 'text',
    placeholder: 'Project manager',
    title: 'Type in the corresponding project manager',
    'prop-name': 'projectManager'
  },
  ORG_ID: {
    class: 'mat-input-element input-org-id hidden',
    type: 'text',
    'prop-name': 'organizationId'
  },
  FROM_DATE: {
    class: 'mat-input-element input-date'
  },
  TO_DATE: {
    class: 'mat-input-element input-date'
  },
  GOAL: {
    class: 'mat-input-element input-goal',
    type: 'text',
    placeholder: 'Goal amount',
    title: 'Type in the desire goal amount. Accepts: Numbers only!'
  },
  ADDRESS: {
    class: 'mat-input-element input-address',
    type: 'text',
    'max-length': '200',
    placeholder: 'Street address',
    title: 'Type in the project location street address.'
  },
  SHORT_DESC: {
    class: 'mat-input-element input-short-desc',
    type: 'text',
    'max-length': '50',
    placeholder: 'Short description',
    title: 'Type in a brief description regarding the project.'
  },
  DESC: {
    class: 'mat-input-element input-desc',
    type: 'text',
    placeholder: 'Description',
    title: 'Type in a detailed description.'
  },
  NATIONAL_PROJECT: {
    class: 'input-national-project hidden',
    'max-length': 1,
  }
};

export const NUMBERS = {
  8: 'backspace',
  13: 'enter',
  37: 'left-arrow',
  38: 'up-arrow',
  39: 'right-arrow',
  40: 'down-arrow',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  96: '0',
  97: '1',
  98: '2',
  99: '3',
  100: '4',
  101: '5',
  102: '6',
  103: '7',
  104: '8',
  105: '9'
};

export const REGEX_UNITS = {
  LETTERS: /^[a-zA-Z]*$/,
  PROJECT: /^([A-Za-z0-9]{6})+[-]+([A-Za-z0-9]{4})/
};
