const { widget } = figma;
const {
  AutoLayout,
  Frame,
  Input,
  Rectangle,
  SVG,
  Text,
  useSyncedState,
  useSyncedMap,
  usePropertyMenu,
} = widget;
import { WidgetContainer} from './components/WidgetContainer';
import { Header} from './components/Header';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

function Widget() {
  const [currentDate, setCurrentDate] = useSyncedState('currentDate', getDate());
  // Component Name
  const [logName, setLogName] = useSyncedState('name', false);
  const [logNameText, setLogNameText] = useSyncedState('nameText', '');
  // Component Description
  const [logDescription, setLogDescription] = useSyncedState('description', false);
  const [logDescriptionText, setLogDescriptionText] = useSyncedState('descriptionText', '');
  // Component Status
  const [logStatus, setLogStatus] = useSyncedState('status', 0);
  // Changes
  const [changeIds, setChangeIds] = useSyncedState<string[]>('changeKeys', []);
  const changes = useSyncedMap<Change>('changes');

  const [typeToAdd, setTypeToAdd] = useSyncedState<ChangeType>('typeToAdd', 'string');

  const addChange = () => {
    const changeId = randomId();
    // changes.set(changeId, { change: '', type: typeToAdd });
    setChangeIds([...changeIds, changeId]);
  };
  const deleteChange = (changeToDelete: string) => {
    changes.delete(changeToDelete);
    setChangeIds([...changeIds].filter((changeId) => changeId !== changeToDelete));
  };
  const moveChange = (changeId: string, offset: 1 | -1) => {
    const idx = changeIds.indexOf(changeId);
    if (idx == -1 || idx + offset >= changeIds.length || idx + offset <= -1) {
      return;
    }
    const cpy = [...changeIds];
    [cpy[idx], cpy[idx + offset]] = [cpy[idx + offset], cpy[idx]];
    setChangeIds(cpy);
  };
  
  usePropertyMenu(
    [
      {
        itemType: 'action',
        tooltip: logName ? 'Hide Name' : 'Show Name',
        propertyName: 'logName',
        icon: '',
      },
      {
        itemType: 'action',
        tooltip: logDescription ? 'Hide Description' : 'Show Description',
        propertyName: 'description',
        icon: '',
      },
      {
        itemType: 'dropdown',
        options: [
          { option: '0', label: 'Set Status...' },
          { option: '1', label: '🙋‍♀️ Proposed' },
          { option: '2', label: '🚧 Draft' },
          { option: '3', label: '🧑‍🚀 Beta' },
          { option: '4', label: '✅ Released' },
          { option: '5', label: '🧊 Depreciated' },
          { option: '6', label: '🚨 Archived' },
        ],
        selectedOption: logStatus.toString(),
        tooltip: 'Set Status',
        propertyName: 'status',
      },
      {
        itemType: 'separator',
      },
      {
        itemType: 'link',
        propertyName: 'formidaLink',
        tooltip: 'Built by Formidable',
        icon: null,
        href: 'https://formidable.com',
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === 'status' && propertyValue) {
        setLogStatus(Number(propertyValue));
      } else if (propertyName === 'logName') {
        console.log('logName');
        setLogName(!logName);
      } else if (propertyName === 'description') {
        setLogDescription(!logDescription);
      }
    },
  );

  return (
    <WidgetContainer>
      <Header
        name={logName}
        description={logDescription}
        nameText={logNameText}
        setNameText={setLogNameText}
        descriptionText={logDescriptionText}
        setDescriptionText={setLogDescriptionText}
        status={logStatus}
        currentDate={currentDate}
      />
    </WidgetContainer>
  );
}

widget.register(Widget)
