import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import {
  AvatarsDiv,
  ItemsBodyContent,
  ItemsContant,
  ItemsHeaderContent,
  ItemsNameImageCircleContent,
  ItemsNameImageContent,
  PopUpDiv,
  PopUpHeader,
  PopUpNotInContact,
  PopUpOverlay,
  PopUpScroll,
} from './ContactModal.styles';
import { ReactComponent as CloseIcon } from '../../Theme/Icons/Close.svg';
import { ReactComponent as VIcon } from '../../Theme/Icons/VIcon.svg';
import { ReactComponent as AddContactIcon } from '../../Theme/Icons/ContactAdd.svg';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, Path } from 'react-hook-form';
import { ReactComponent as Search } from '../../Theme/Icons/Search.svg';
import { Group, User } from '../../api/interfaces';
import { useAtom } from 'jotai';
import { userAtom } from '../../Jotai/atoms';
import InputTextFull from '../../components/Inputs/InputTextFull/InputTextFull';
import { useState, useEffect } from 'react';

// Add TypeScript declarations for the Contact Picker API
interface ContactProperty {
  name?: string[];
  email?: string[];
  tel?: string[];
  address?: string[];
  icon?: string[];
  [key: string]: string[] | undefined;
}

interface ContactsManager {
  select: (properties: string[], options?: { multiple?: boolean }) => Promise<ContactProperty[]>;
  getProperties: () => Promise<string[]>;
}

// Extend the Navigator interface
declare global {
  interface Navigator {
    contacts?: ContactsManager;
  }
}

interface ContactModalProps<T extends FieldValues> {
  open: boolean;
  handlePopUpClose: () => void;
  control: Control<T>;
  inputName: Path<T>;
  groups: Group[];
  selectedUsers?: User[];
  handleSelectUser: (user: User) => void;
  limit?: number;
}

const ContactModal = <T extends FieldValues>({
  open,
  handlePopUpClose,
  control,
  inputName,
  groups,
  selectedUsers,
  handleSelectUser,
  limit,
}: ContactModalProps<T>) => {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<User[]>([]);
  const [importError, setImportError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useAtom(userAtom);
  const [isContactsSupported, setIsContactsSupported] = useState(false);

  useEffect(() => {
    // Check if Contacts API is supported
    setIsContactsSupported(!!navigator.contacts && 'select' in (navigator.contacts || {}));
  }, []);

  const willExceedLimit = (newUsers: User[]) => {
    return (selectedUsers?.length || 0) + newUsers.length > (limit || Infinity);
  };

  const handleSelectSingleUser = (user: User) => {
    if (isSelected(user)) {
      handleSelectUser(user);
    } else {
      if (willExceedLimit([user])) {
        alert(t('ContactModal.limitExceeded', { limit }));
        return;
      }
      handleSelectUser(user);
    }
  };

  const isSelected = (item: User) =>
    selectedUsers?.some((selectedItem) => selectedItem.id === item.id);

  const importContacts = async () => {
    try {
      // Check if the Contacts API is supported
      if (!navigator.contacts || !('select' in navigator.contacts)) {
        throw new Error(t('ContactModal.contactsApiNotSupported'));
      }

      // Request permission and get contacts
      const properties = ['name', 'email', 'tel'];
      const options = { multiple: true };
      const contactsList = await navigator.contacts.select(properties, options);

      // Convert contact data to User format - adjust properties according to your User interface
      const importedUsers: User[] = contactsList.map(
        (contact, index) =>
          ({
            id: `imported-${Date.now()}-${index}`, // Generate temp ID
            name: contact.name?.[0] || t('ContactModal.noName'),
            email: contact.email?.[0] || '',
            phone: contact.tel?.[0] || '',
            // Add other required User fields with default values as needed
          }) as User
      ); // Type assertion because we might not be setting all User properties

      setContacts((prevContacts) => [...prevContacts, ...importedUsers]);
      setImportError(null);
    } catch (err: any) {
      setImportError(err.message || t('ContactModal.importError'));
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.phoneNumber && contact.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <PopUpOverlay isOpen={open} onClick={handlePopUpClose}>
      <PopUpDiv isOpen={open} onClick={(e) => e.stopPropagation()} padding>
        <PopUpHeader>
          <VIcon onClick={handlePopUpClose} />
          <Typography
            value={t('ContactModal.chooseContact')}
            variant={TypographyTypes.H6}
            styleProps={{ textAlign: 'center', width: '100%' }}
          />
          <CloseIcon onClick={handlePopUpClose} />
        </PopUpHeader>

        {/* {inputName && (
          <InputTextFull
            isSetHeight={true}
            displayCharLimit={false}
            placeholder={t('ContactModal.search')}
            icon={Search}
            typography="TextSmall"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        )} */}

        <PopUpNotInContact onClick={importContacts}>
          <AddContactIcon />
          <Typography value={t('ContactModal.notInContact')} variant={TypographyTypes.TextBig} />
        </PopUpNotInContact>

        {importError && (
          <Typography
            value={importError}
            variant={TypographyTypes.TextSmall}
            styleProps={{ color: 'red', margin: '8px 0' }}
          />
        )}

        <PopUpScroll>
          <ItemsContant>
            <ItemsHeaderContent>
              <Typography value={t('ContactModal.contacts')} variant={TypographyTypes.H6} />
            </ItemsHeaderContent>

            {/* Display imported contacts */}
            {filteredContacts.length > 0 ? (
              <ItemsBodyContent>
                {filteredContacts.map((contact) => (
                  <ItemsNameImageContent
                    key={contact.id}
                    onClick={() => handleSelectSingleUser(contact)}
                    // isSelected={isSelected(contact)}
                  >
                    <ItemsNameImageCircleContent>
                      {/* Display first letter of name as avatar or use an avatar component */}
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: '#e0e0e0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {contact.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <Typography
                          value={contact.fullName || ''}
                          variant={TypographyTypes.TextBig}
                        />
                        <Typography
                          value={contact.phoneNumber || contact.email || ''}
                          variant={TypographyTypes.TextSmall}
                        />
                      </div>
                    </ItemsNameImageCircleContent>
                    {isSelected(contact) && <div>✓</div>}
                  </ItemsNameImageContent>
                ))}
              </ItemsBodyContent>
            ) : (
              <Typography
                value={t('ContactModal.noContactsFound')}
                variant={TypographyTypes.TextSmall}
                styleProps={{ textAlign: 'center', padding: '16px' }}
              />
            )}
          </ItemsContant>
        </PopUpScroll>
      </PopUpDiv>
    </PopUpOverlay>
  );
};

export default ContactModal;
