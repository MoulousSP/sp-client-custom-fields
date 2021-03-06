/**
 * @file TestWebPart.ts
 * Custom field implementation sample for the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { Version } from '@microsoft/sp-core-library';

import * as strings from 'testStrings';
import Test, { ITestProps } from './components/Test';
import { ITestWebPartProps } from './ITestWebPartProps';

//Include the PropertyFieldDatePicker component
import { PropertyFieldDatePicker } from '../../PropertyFieldDatePicker';
//Include the PropertyFieldDateTimePicker component
import { PropertyFieldDateTimePicker, ITimeConvention } from '../../PropertyFieldDateTimePicker';
//Include the PropertyFieldColorPicker component
import { PropertyFieldColorPicker } from '../../PropertyFieldColorPicker';
//Include the PropertyFieldPeoplePicker component
import { PropertyFieldPeoplePicker } from '../../PropertyFieldPeoplePicker';
//Include the PropertyFieldSPListPicker component
import { PropertyFieldSPListPicker, PropertyFieldSPListPickerOrderBy } from '../../PropertyFieldSPListPicker';
//Include the PropertyFieldSPListMultiplePicker component
import { PropertyFieldSPListMultiplePicker, PropertyFieldSPListMultiplePickerOrderBy } from '../../PropertyFieldSPListMultiplePicker';
//Include the PropertyFieldSPFolderPicker component
import { PropertyFieldSPFolderPicker } from '../../PropertyFieldSPFolderPicker';
//Include the PropertyFieldPassword component
import { PropertyFieldPassword } from '../../PropertyFieldPassword';
//Include the PropertyFieldFontPicker component
import { PropertyFieldFontPicker } from '../../PropertyFieldFontPicker';
//Include the PropertyFieldFontSizePicker component
import { PropertyFieldFontSizePicker } from '../../PropertyFieldFontSizePicker';
//Include the PropertyFieldPhoneNumber component
import { PropertyFieldPhoneNumber, IPhoneNumberFormat } from '../../PropertyFieldPhoneNumber';
//Include the PropertyFieldMaskedInput component
import { PropertyFieldMaskedInput } from '../../PropertyFieldMaskedInput';
//Include the PropertyFieldMaskedInput component
import { PropertyFieldMapPicker } from '../../PropertyFieldMapPicker';
//Include the PropertyFieldPicturePicker component
import { PropertyFieldPicturePicker } from '../../PropertyFieldPicturePicker';
//Include the PropertyFieldIconPicker component
import { PropertyFieldIconPicker } from '../../PropertyFieldIconPicker';
//Include the PropertyFieldDocumentPicker component
import { PropertyFieldDocumentPicker } from '../../PropertyFieldDocumentPicker';
//Include the PropertyFieldDisplayMode component
import { PropertyFieldDisplayMode } from '../../PropertyFieldDisplayMode';
//Include the PropertyFieldCustomList component
import { PropertyFieldCustomList, CustomListFieldType } from '../../PropertyFieldCustomList';
//Include the PropertyFieldSPListQuery component
import { PropertyFieldSPListQuery, PropertyFieldSPListQueryOrderBy } from '../../PropertyFieldSPListQuery';
//Include the PropertyFieldAlignPicker component
import { PropertyFieldAlignPicker } from '../../PropertyFieldAlignPicker';
//Include the PropertyFieldDropDownSelect component
import { PropertyFieldDropDownSelect } from '../../PropertyFieldDropDownSelect';
//Include the PropertyFieldRichTextBox component
import { PropertyFieldRichTextBox } from '../../PropertyFieldRichTextBox';
//Include the PropertyFieldSliderRange component
import { PropertyFieldSliderRange } from '../../PropertyFieldSliderRange';
//Include the PropertyFieldDimensionPicker component
import { PropertyFieldDimensionPicker } from '../../PropertyFieldDimensionPicker';


export default class TestWebPart extends BaseClientSideWebPart<ITestWebPartProps> {

  public constructor(context: IWebPartContext) {
    super();

    //Hack: to invoke correctly the onPropertyChange function outside this class
    //we need to bind this object on it first
    this.onPropertyPaneFieldChanged = this.onPropertyPaneFieldChanged.bind(this);
    this.testPropertyChanged = this.testPropertyChanged.bind(this);

  }

  public render(): void {
    const element: React.ReactElement<ITestProps> = React.createElement(Test, {
      description: this.properties.description,
      color: this.properties.color,
      date: this.properties.date,
      date2: this.properties.date2,
      datetime: this.properties.datetime,
      folder: this.properties.folder,
      people: this.properties.people,
      list: this.properties.list,
      listsCollection: this.properties.listsCollection,
      password: this.properties.password,
      font: this.properties.font,
      fontSize: this.properties.fontSize,
      phone: this.properties.phone,
      maskedInput: this.properties.maskedInput,
      geolocation: this.properties.geolocation,
      picture: this.properties.picture,
      icon: this.properties.icon,
      document: this.properties.document,
      displayMode: this.properties.displayMode,
      customList: this.properties.customList,
      query: this.properties.query,
      align: this.properties.align,
      richTextBox: this.properties.richTextBox,
      dropDownSelect: this.properties.dropDownSelect,
      sliderRange: this.properties.sliderRange,
      dimension: this.properties.dimension
    });

    ReactDom.render(element, this.domElement);
  }

	protected get disableReactivePropertyChanges(): boolean {
		return false;
	}

  private formatDateIso(date: Date): string {
    //example for ISO date formatting
    return date.toISOString();
  }

  private testPropertyChanged(propertyPath: string, oldValue: any, newValue: any): void {
    this.properties.font = newValue;
    this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }


/*
  //Samples of validation method, to use
  //with the onGetErrorMessage function of Propery Fields.
  //See https://dev.office.com/sharepoint/docs/spfx/web-parts/guidance/validate-web-part-property-values

  private canNotBeEmpty(value: string): string {
    if (value === null || value.trim().length === 0) {
      return 'Provide a value';
    }
    return '';
  }

  private canNotBeEmptyPromise(value: string): Promise<string> {
    return new Promise<string>((resolve: (validationErrorMessage: string) => void, reject: (error: any) => void): void => {
      if (value === null || value.length === 0) {
        resolve('Provide a value');
        return;
      }
      resolve('');
    });
  }

  private canNotBeArial(value: string): string {
    if (value === null || value.trim().length === 0) {
      return '';
    }
    if (value.indexOf("Arial") !== -1)
      return 'Font can not be Arial';
    return '';
  }

  private canNotBeXSmall(value: string): string {
    if (value === null || value.trim().length === 0) {
      return '';
    }
    if (value.indexOf("x-small") !== -1)
      return 'Font size can not be x-small';
    return '';
  }

  private canNotBeAADLogo(value: string): string {
    if (value === null || value.trim().length === 0) {
      return '';
    }
    if (value.indexOf("AADLogo") !== -1)
      return 'Icon can not be AADLogo';
    return '';
  }

  private canNotBeBlack(value: string): string {
    if (value === null || value.trim().length === 0) {
      return '';
    }
    if (value.indexOf("#000000") !== -1)
      return 'Color can not be black';
    return '';
  }

  private canNotBeAlignLeft(value: string): string {
    if (value === null || value.trim().length === 0) {
      return '';
    }
    if (value.indexOf("left") !== -1)
      return 'Align can not be left';
    return '';
  }

  private arrayCanNotBeEmpty(value: string[]): string {
    if (value === null || value.length === 0) {
      return 'Array can not be empty';
    }
    return '';
  }

  private canNotBeIn2016(value: string): string {
    if (value === null || value.trim().length === 0) {
      return '';
    }
    if (value.indexOf("2016") !== -1)
      return 'Date can not be during 2016.';
    return '';
  }

  private canNotBe0Location(value: string): string {
    if (value === null || value.trim().length === 0) {
      return '';
    }
    if (value == '0,0')
      return 'Bad geoLocation.';
    return '';
  }

  private badPhoneNumber(value: string): string {
    if (value === null || value.trim().length === 0 || value == '(') {
      return 'Provide a valid phone number.';
    }
    if (value.indexOf("(00") != 0) {
      return 'Phone number must be begin with (00.';
    }
    return '';
  }

  private canNotSelectThisList(value: string): string {
    if (value === null || value.trim().length === 0) {
      return '';
    }
    if (value.indexOf("6770c83b") !== -1) {
      return 'You can not select this list.';
    }
    return '';
  }

  private canNotBeMock(value: string): string {
    if (value === null || value.trim().length === 0) {
      return '';
    }
    if (value.indexOf('mock'))
      return 'The mock is not allowed';
    return '';
  }

  private canNotBeList(value: string): string {
    if (value === null || value.trim().length === 0) {
      return '';
    }
    if (value.indexOf("list") !== -1) {
      return 'You can not select the list mode.';
    }
    return '';
  }

  private canNotBeOrderById(value: string): string {
    if (value === null || value.trim().length === 0) {
      return '';
    }
    if (value.indexOf("orderBy=ID") !== -1) {
      return 'You can not order by ID.';
    }
    return '';
  }

  private canNotChooseMoreThan2People(value: any[]): string {
    if (value.length > 2) {
      return 'You can not choose more than 2 people.';
    }
    return '';
  }

  private canNotBeDoc(value: string): string {
    if (value === null || value.trim().length === 0) {
      return '';
    }
    if (value.indexOf(".doc") !== -1) {
      return 'You can not choose a *.doc file.';
    }
    return '';
  }

  private invalidRange(value: string): string {
    if (value === null || value.trim().length === 0) {
      return '';
    }
    if (value === '0,500') {
      return 'Invalid range.';
    }
    return '';
  }
*/

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          //Display the web part properties as accordion
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: 'Layout Fields',
              groupFields: [
                PropertyFieldFontPicker('font', {
                  label: strings.FontFieldLabel,
                  useSafeFont: true,
                  previewFonts: true,
                  initialValue: this.properties.font,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'fontFieldId'
                }),
                PropertyFieldFontSizePicker('fontSize', {
                  label: strings.FontSizeFieldLabel,
                  usePixels: false,
                  preview: true,
                  initialValue: this.properties.fontSize,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'fontSizeFieldId'
                }),
                PropertyFieldFontSizePicker('fontSize', {
                  label: strings.FontSizeFieldLabel,
                  usePixels: true,
                  preview: true,
                  initialValue: this.properties.fontSize,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'fontSizeField2Id'
                }),
                PropertyFieldIconPicker('icon', {
                  label: strings.IconFieldLabel,
                  initialValue: this.properties.icon,
                  orderAlphabetical: true,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'iconFieldId'
                }),
                PropertyFieldColorPicker('color', {
                  label: strings.ColorFieldLabel,
                  initialColor: this.properties.color,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'colorFieldId'
                }),
                PropertyFieldAlignPicker('align', {
                  label: strings.AlignFieldLabel,
                  initialValue: this.properties.align,
                  onPropertyChanged: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'alignFieldId'
                }),
                PropertyFieldDimensionPicker('dimension', {
                  label: strings.DimensionFieldLabel,
                  initialValue: this.properties.dimension,
                  preserveRatio: true,
                  preserveRatioEnabled: true,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'dimensionFieldId'
                })
              ],
            },
            {
              groupName: 'Text Input Fields',
              groupFields: [

                PropertyFieldCustomList('customList', {
                  label: strings.CustomListFieldLabel,
                  value: this.properties.customList,
                  headerText: "Manage News",
                  fields: [
                    { title: 'News Title', required: true, type: CustomListFieldType.string },
                    { title: 'Sub title', required: true, type: CustomListFieldType.string },
                    { title: 'Link', required: false, type: CustomListFieldType.string, hidden: true },
                    { title: 'Order', required: true, type: CustomListFieldType.number },
                    { title: 'Active', required: false, type: CustomListFieldType.boolean },
                    { title: 'Start Date', required: false, type: CustomListFieldType.date, hidden: true },
                    { title: 'End Date', required: false, type: CustomListFieldType.date, hidden: true },
                    { title: 'Picture', required: false, type: CustomListFieldType.picture, hidden: true },
                    { title: 'Users', required: false, type: CustomListFieldType.users, hidden: true }
                    /*,
                    { title: 'Font', required: false, type: CustomListFieldType.font, hidden: true },
                    { title: 'Font size', required: false, type: CustomListFieldType.fontSize, hidden: true },
                    { title: 'Icon', required: false, type: CustomListFieldType.icon, hidden: true },
                    { title: 'Password', required: false, type: CustomListFieldType.password, hidden: true },
                    { title: 'Users', required: false, type: CustomListFieldType.users, hidden: true },
                    { title: 'Color', required: false, type: CustomListFieldType.color, hidden: true },
                    { title: 'List', required: false, type: CustomListFieldType.list, hidden: true },
                    { title: 'Picture', required: false, type: CustomListFieldType.picture, hidden: true },
                    { title: 'Document', required: false, type: CustomListFieldType.document, hidden: true },
                    { title: 'Folder', required: false, type: CustomListFieldType.folder, hidden: true }
                    */
                  ],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  disabled: false,
                  key: 'customListFieldId'
                }),
                PropertyFieldDropDownSelect('dropDownSelect', {
                  label: strings.DropDownSelectFieldLabel,
                  options: [
                    {'key': 'Option1', 'text': 'Option 1'},
                    {'key': 'Option2', 'text': 'Option 2'},
                    {'key': 'Option3', 'text': 'Option 3'},
                    {'key': 'Option4', 'text': 'Option 4'},
                    {'key': 'Option5', 'text': 'Option 5'},
                    {'key': 'Option6', 'text': 'Option 6'},
                    {'key': 'Option7', 'text': 'Option 7'}
                  ],
                  initialValue: this.properties.dropDownSelect,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'dropDownSelectFieldId'
                }),
                PropertyFieldPassword('password', {
                  label: strings.PasswordFieldLabel,
                  initialValue: this.properties.password,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'passwordFieldId'
                }),
                PropertyFieldRichTextBox('richTextBox', {
                  label: strings.RichTextBoxFieldLabel,
                  initialValue: this.properties.richTextBox,
                  inline: false,
                  minHeight: 100,
                  mode: 'basic', //'basic' or 'standard' or 'full'
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'richFieldId'
                }),
                PropertyFieldDatePicker('date', {
                  label: strings.DateFieldLabel,
                  initialDate: this.properties.date,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'dateFieldId'
                }),
                PropertyFieldDatePicker('date2', {
                  label: strings.DateFieldLabel,
                  initialDate: this.properties.date2,
                  formatDate: this.formatDateIso,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'date2FieldId'
                }),
                PropertyFieldDateTimePicker('datetime', {
                  label: strings.DateTimeFieldLabel,
                  initialDate: this.properties.datetime,
                  //formatDate: this.formatDateIso,
                  timeConvention: ITimeConvention.Hours12,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'dateTimeFieldId'
                }),
                PropertyFieldSliderRange('sliderRange', {
                  label: strings.SliderRangeFieldLabel,
                  initialValue: this.properties.sliderRange,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  showValue: true,
                  disabled: false,
                  min: 0,
                  max: 500,
                  step: 1,
                  orientation: 'horizontal', //'horizontal' or 'vertical'
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'sliderRangeFieldId'
                }),
                PropertyFieldPhoneNumber('phone', {
                  label: strings.PhoneNumberFieldLabel,
                  initialValue: this.properties.phone,
                  phoneNumberFormat: IPhoneNumberFormat.UnitedStates,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'phoneFieldId'
                }),
                PropertyFieldMaskedInput('maskedInput', {
                  label: strings.MaskedInputFieldLabel,
                  initialValue: this.properties.maskedInput,
                  pattern: '\d{4} \d{4} \d{4} \d{4}',
                  placeholder: 'XXXX XXXX XXXX XXXX',
                  maxLength: '19',
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'maskedFieldId'
                }),
                PropertyFieldMapPicker('geolocation', {
                  label: strings.GeoLocationFieldLabel,
                  longitude: this.properties.geolocation != null ? this.properties.geolocation.substr(0, this.properties.geolocation.indexOf(",")) : '0',
                  latitude: this.properties.geolocation != null ? this.properties.geolocation.substr(this.properties.geolocation.indexOf(",") + 1, this.properties.geolocation.length - this.properties.geolocation.indexOf(",")) : '0',
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'geoLocationFieldId'
                })
            ],
            },
            {
              groupName: 'SharePoint Fields',
              groupFields: [

                PropertyFieldPicturePicker('picture', {
                  label: strings.PictureFieldLabel,
                  initialValue: this.properties.picture,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  disabled: false,
                  readOnly: true,
                  previewImage: true,
                  allowedFileExtensions: '.gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png',
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'pictureFieldId'
                }),
                PropertyFieldDocumentPicker('document', {
                  label: strings.DocumentFieldLabel,
                  initialValue: this.properties.document,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  disabled: false,
                  readOnly: true,
                  previewDocument: true,
                  allowedFileExtensions: '.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.txt',
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'documentFieldId'
                }),
                PropertyFieldPeoplePicker('people', {
                  label: strings.PeopleFieldLabel,
                  initialData: this.properties.people,
                  allowDuplicate: true,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'peopleFieldId'
                }),
               PropertyFieldSPListPicker('list', {
                  label: strings.SPListFieldLabel,
                  selectedList: this.properties.list,
                  includeHidden: false,
                  //baseTemplate: 109,
                  orderBy: PropertyFieldSPListPickerOrderBy.Title,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listFieldId'
                }),
                PropertyFieldSPFolderPicker('folder', {
                  label: strings.SPFolderFieldLabel,
                  initialFolder: this.properties.folder,
                  //baseFolder: '/sites/devcenter/_catalogs',
                  context: this.context,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'folderFieldId'
                }),
                PropertyFieldSPListMultiplePicker('listsCollection', {
                  label: strings.SPListFieldLabel,
                  selectedLists: this.properties.listsCollection,
                  includeHidden: false,
                  baseTemplate: 109,
                  orderBy: PropertyFieldSPListMultiplePickerOrderBy.Title,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listCollectionFieldId'
                })
              ]
            },
            {
              groupName: 'SharePoint Query',
              groupFields: [
                PropertyFieldSPListQuery('query', {
                  label: strings.QueryFieldLabel,
                  query: this.properties.query,
                  includeHidden: false,
                  //baseTemplate: 109,
                  orderBy: PropertyFieldSPListQueryOrderBy.Title,
                  showOrderBy: true,
                  showMax: true,
                  showFilters: true,
                  max: 50,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'spListFieldId'
                }),
                 PropertyFieldDisplayMode('displayMode', {
                  label: strings.DisplayModeFieldLabel,
                  initialValue: this.properties.displayMode,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'displayModeFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}











