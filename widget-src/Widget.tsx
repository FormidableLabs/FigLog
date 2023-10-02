import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WidgetContainer } from './components/WidgetContainer';
import { ChangeLogEmpty } from './components/ChangeLogEmpty';
import { ChangeLogList } from './components/ChangeLogList';
import { getDate, getTime } from './utilities/Utils';

const { currentUser, widget } = figma;
const { usePropertyMenu, useEffect, useSyncedMap, useSyncedState } = widget;

function Widget() {
  // Property Menu
  const [showName, setShowName] = useSyncedState('showName', true);
  const [showDescription, setShowDescription] = useSyncedState('showDescription', true);
  const [showStatus, setShowStatus] = useSyncedState('showStatus', '0');
  const [showVersion, setShowVersion] = useSyncedState('showVersion', false);
  const [showBranding, setShowBranding] = useSyncedState('showBradning', true);
  // Meta Data
  const [createdDate, setCreatedDate] = useSyncedState('createdDate', '');
  const [updatedDate, setUpdatedDate] = useSyncedState('updatedDate', '');
  const [version, setVersion] = useSyncedState('version', '');
  // Change Logs
  const [changeIds, setChangeIds] = useSyncedState<string[]>('changeKeys', []);
  const changeLogs = useSyncedMap<ChangeLog>('changes');

  const addChange = (changeToAdd: string) => {
    changeLogs.set(changeToAdd, {
      change: '',
      type: 'added',
      date: getDate(),
      time: getTime(),
      user: currentUser,
      editCount: 0,
    });
    setChangeIds([changeToAdd, ...changeIds]);
    setUpdatedDate(getDate());
  };
  const deleteChange = (changeToDelete: string) => {
    changeLogs.delete(changeToDelete);
    setChangeIds([...changeIds].filter(changeId => changeId !== changeToDelete));
    setUpdatedDate(getDate());
  };

  usePropertyMenu(
    [
      {
        itemType: 'action',
        tooltip: showName ? 'Hide Name' : 'Show Name',
        propertyName: 'name',
        icon: '',
      },
      {
        itemType: 'separator',
      },
      {
        itemType: 'action',
        tooltip: showDescription ? 'Hide Description' : 'Show Description',
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
        selectedOption: showStatus.toString(),
        tooltip: 'Set Status',
        propertyName: 'status',
      },
      {
        itemType: 'separator',
      },
      {
        itemType: 'action',
        tooltip: showVersion ? 'Hide Version' : 'Show Version',
        propertyName: 'version',
        icon: '',
      },
      {
        itemType: 'action',
        tooltip: showBranding ? 'Hide Branding' : 'Show Branding',
        propertyName: 'branding',
        icon: '',
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === 'status' && propertyValue) {
        setShowStatus(propertyValue);
        setUpdatedDate(getDate());
      } else if (propertyName === 'name') {
        setShowName(!showName);
        setUpdatedDate(getDate());
      } else if (propertyName === 'description') {
        setShowDescription(!showDescription);
        setUpdatedDate(getDate());
      } else if (propertyName === 'version') {
        setShowVersion(!showVersion);
        setUpdatedDate(getDate());
      } else if (propertyName === 'branding') {
        setShowBranding(!showBranding);
        setUpdatedDate(getDate());
      }
    }
  );

  useEffect(() => {
    if (createdDate === '') {
      setCreatedDate(getDate());
    }

    if (updatedDate === '') {
      setUpdatedDate(getDate());
    }
  });

  return (
    <WidgetContainer>
      <Header
        name={showName}
        description={showDescription}
        status={showStatus}
        createdDate={createdDate}
        setCreatedDate={setCreatedDate}
        updatedDate={updatedDate}
        setUpdatedDate={setUpdatedDate}
        version={version}
        setVersion={setVersion}
        showVersion={showVersion}
        addChange={addChange}
      />
      {changeIds.length === 0 ? (
        <ChangeLogEmpty />
      ) : (
        <ChangeLogList
          changeLogs={changeLogs}
          changeLogIds={changeIds}
          deleteChange={deleteChange}
          setUpdatedDate={setUpdatedDate}
        />
      )}
      <Footer showBranding={showBranding} />
    </WidgetContainer>
  );
}

widget.register(Widget);
