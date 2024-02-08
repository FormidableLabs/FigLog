import { ChangeLog } from './types/ChangeLog';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WidgetContainer } from './components/WidgetContainer';
import { ChangeLogEmpty } from './components/ChangeLogEmpty';
import { ChangeLogList } from './components/ChangeLogList';

const { currentUser, widget } = figma;
const { usePropertyMenu, useEffect, useSyncedMap, useSyncedState } = widget;

function Widget() {
  // Property Menu
  const [showName, setShowName] = useSyncedState('showName', true);
  const [showDescription, setShowDescription] = useSyncedState('showDescription', true);
  const [showStatus, setShowStatus] = useSyncedState('showStatus', '0');
  const [showVersion, setShowVersion] = useSyncedState('showVersion', false);
  const [showBranding, setShowBranding] = useSyncedState('showBradning', true); // fixing the typo messes with branding state on existing widgets
  const [showLogTypes, setShowLogTypes] = useSyncedState('showLogTypes', false);
  // Meta Data
  const [createdDate, setCreatedDate] = useSyncedState('createdDate', 0);
  const [updatedDate, setUpdatedDate] = useSyncedState('updatedDate', 0);
  const [adminId, setAdminId] = useSyncedState('adminId', '');
  const [version, setVersion] = useSyncedState('version', '');
  // Change Logs
  const [changeIds, setChangeIds] = useSyncedState<string[]>('changeKeys', []);
  const changeLogs = useSyncedMap<ChangeLog>('changes');

  const addChange = (changeToAdd: string) => {
    changeLogs.set(changeToAdd, {
      change: '',
      type: 'none',
      createdDate: Date.now(),
      editedDate: Date.now(),
      user: currentUser,
      editCount: 0,
      state: {
        showTypeMenu: false,
        showLinkForm: false,
        linkFormError: { label: false, url: false }
      },
      links: [],
    });
    setChangeIds([changeToAdd, ...changeIds]);
    setUpdatedDate(Date.now());
  };
  const deleteChange = (changeToDelete: string) => {
    changeLogs.delete(changeToDelete);
    setChangeIds([...changeIds].filter(changeId => changeId !== changeToDelete));
    setUpdatedDate(Date.now());
  };

  usePropertyMenu(
    [
      {
        itemType: 'dropdown',
        options: [
          { option: '0', label: 'Status...' },
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
        itemType: 'toggle',
        tooltip: 'Name',
        propertyName: 'name',
        isToggled: showName,
      },
      {
        itemType: 'toggle',
        tooltip: 'Description',
        propertyName: 'description',
        isToggled: showDescription,
      },
      {
        itemType: 'toggle',
        tooltip: 'Version',
        propertyName: 'version',
        isToggled: showVersion,
      },
      {
        itemType: 'toggle',
        tooltip: 'Log Types',
        propertyName: 'logTypes',
        isToggled: showLogTypes,
      },
      {
        itemType: 'toggle',
        tooltip: 'Branding',
        propertyName: 'branding',
        isToggled: showBranding,
      },
    ],
    ({ propertyName, propertyValue }) => {
      switch (propertyName) {
        case 'status':
          if (propertyValue) {
            setShowStatus(propertyValue);
          }
          break;
        case 'name':
          setShowName(!showName);
          break;
        case 'description':
          setShowDescription(!showDescription);
          break;
        case 'version':
          setShowVersion(!showVersion);
          break;
        case 'branding':
          setShowBranding(!showBranding);
          break;
        case 'logTypes':
          setShowLogTypes(!showLogTypes);
          break;
      }
      setUpdatedDate(Date.now());
    }
  );

  useEffect(() => {
    const today = Date.now();

    if (createdDate === 0) {
      setCreatedDate(today);
    }

    if (updatedDate === 0) {
      setUpdatedDate(today);
    }

    if (adminId === '') {
      setAdminId(currentUser?.id || '');
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
          adminId={adminId}
          deleteChange={deleteChange}
          setUpdatedDate={setUpdatedDate}
          showTypes={showLogTypes}
        />
      )}
      <Footer showBranding={showBranding} />
    </WidgetContainer>
  );
}

widget.register(Widget);
