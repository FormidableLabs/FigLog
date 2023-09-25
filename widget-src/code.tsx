import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WidgetContainer } from './components/WidgetContainer';
import { ChangeLogEmpty } from './components/ChangeLogEmpty';
import { ChangeLogList } from './components/ChangeLogList';
import { getDate } from './utilities/Utils';

const { currentUser, widget } = figma;
const { useEffect, usePropertyMenu, useSyncedMap, useSyncedState } = widget;

function Widget() {
  const [currentDate, setCurrentDate] = useSyncedState('currentDate', getDate());
  // Widget Meta
  const [name, setName] = useSyncedState('name', true);
  const [nameText, setNameText] = useSyncedState('nameText', '');
  const [description, setDescription] = useSyncedState('description', true);
  const [descriptionText, setDescriptionText] = useSyncedState('descriptionText', '');
  const [status, setStatus] = useSyncedState('status', '');
  // Change Logs
  const [changeIds, setChangeIds] = useSyncedState<string[]>('changeKeys', []);
  const changeLogs = useSyncedMap<ChangeLog>('changes');

  const addChange = (changeToAdd: string) => {
    console.log('changeId', changeToAdd);
    changeLogs.set(changeToAdd, {
      change: '',
      status: 'none',
      date: getDate(),
      user: currentUser,
    });
    setChangeIds([...changeIds, changeToAdd]);
  };
  const deleteChange = (changeToDelete: string) => {
    changeLogs.delete(changeToDelete);
    setChangeIds([...changeIds].filter(changeId => changeId !== changeToDelete));
  };

  usePropertyMenu(
    [
      {
        itemType: 'action',
        tooltip: name ? 'Hide Name' : 'Show Name',
        propertyName: 'name',
        icon: '',
      },
      {
        itemType: 'separator',
      },
      {
        itemType: 'action',
        tooltip: description ? 'Hide Description' : 'Show Description',
        propertyName: 'description',
        icon: '',
      },
      {
        itemType: 'separator',
      },
      {
        itemType: 'dropdown',
        options: [
          { option: '0', label: 'Set Status...' },
          { option: '1', label: 'Proposed' },
          { option: '2', label: 'Draft' },
          { option: '3', label: 'Beta' },
          { option: '4', label: 'Released' },
          { option: '5', label: 'Depreciated' },
          { option: '6', label: 'Archived' },
        ],
        selectedOption: status.toString(),
        tooltip: 'Set Status',
        propertyName: 'status',
      },
      // {
      //   itemType: 'link',
      //   propertyName: 'formidaLink',
      //   tooltip: 'Formidable OSS',
      //   icon: null,
      //   href: 'https://formidable.com/open-source/',
      // },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === 'status' && propertyValue) {
        setStatus(propertyValue);
      } else if (propertyName === 'name') {
        setName(!name);
      } else if (propertyName === 'description') {
        setDescription(!description);
      }
    }
  );

  useEffect(() => {
    if (!name) {
      if (currentUser) {
        console.log('currentUser', currentUser);
      } else {
        figma.notify('Please login to figma');
      }
    }
  });

  return (
    <WidgetContainer>
      <Header
        name={name}
        description={description}
        nameText={nameText}
        setNameText={setNameText}
        descriptionText={descriptionText}
        setDescriptionText={setDescriptionText}
        status={status}
        currentDate={currentDate}
        addChange={addChange}
      />
      {changeIds.length === 0 ? (
        <ChangeLogEmpty />
      ) : (
        <ChangeLogList changeLogs={changeLogs} changeLogIds={changeIds} deleteChange={deleteChange} />
      )}
      <Footer />
    </WidgetContainer>
  );
}

widget.register(Widget);
