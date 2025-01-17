import { useCallback, useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

export function useContacts() {
  const [status, setStatus] = useState<Contacts.PermissionStatus | null>(null);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  const requestPermission = useCallback(async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    setStatus(status);
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      setStatus(status);

      if (status === Contacts.PermissionStatus.GRANTED) {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
          ],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  return {
    status,
    requestPermission,
    contacts,
  };
}
