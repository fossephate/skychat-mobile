// import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { router } from 'expo-router';
// // import { useProps } from "@mantine/core";
// import { Contact, useGetContactsInOrbitQuery, useGetContactsQuery } from "@web/contact";
// import { PropsWithChildren, useCallback, useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ListProps, ListRowProps } from "@web/common/components/List/List";
// import { List } from "./List";
// import { IconPlus, IconUser } from "@tabler/icons-react";
// import clsx from "clsx";

// // import classes from "@web/contact/components/Contacts/Contacts.module.css";// can't use css modules in react-native
// // import ContactsHeader from "@web/contact/components/Contacts/ContactsHeader";

// export type SupportedQueries = typeof useGetContactsQuery | typeof useGetContactsInOrbitQuery;

// export interface ContactsProps extends Partial<Omit<ListProps<Contact, SupportedQueries>, "onRowClick">> {
//     onRowClick?: ListProps<Contact, SupportedQueries>["onRowClick"] | null;
// }

// const componentName = "Web-Contact-Contacts";
// const defaultProps: Partial<ContactsProps> = {
//     query: useGetContactsQuery,
//     queryArg: { returnCount: true },
//     mapResult: (res) => [res.contacts, res.continue],
//     mapRowKey: (contact) => contact.id,
//     mapRow: (_contact, props, _page, _idx) => {
//         return <ContactsRow {...props} />;
//     },
//     selectionCheck: (selections, contact) => selections.has(contact.id),
// };

// export const Contacts = (props: ContactsProps) => {
//     const {
//         loader,
//         header,
//         search: baseSearch,
//         query,
//         queryArg,
//         mapResult,
//         mapRowKey,
//         mapRow,
//         onRowClick,
//         ...rest
//     } = props;

//     // const navigate = useNavigate();
//     // const onNavigateRowClick = useCallback(
//     //     (contact: Contact) => {
//     //         navigate(`/contacts/${contact.id}`);
//     //     },
//     //     [navigate],
//     // );

//     // // TODO: Has to be a better way to express this and still allow consumers to pass `null` when you don't want to have the default.
//     // //       Most of these can be solved by using `defaultProps`, but a couple, like `header` and `onRowClick` can't be solved that way.
//     let defaultLoader = loader;
//     if (defaultLoader === undefined) {
//         // defaultLoader = <ContactsLoader />;
//     }
//     let defaultHeader = header;
//     if (defaultHeader === undefined) {
//         // defaultHeader = <ContactsHeader withSearch withCreate />;
//     }
//     let onDefaultRowClick = onRowClick;
//     // if (onDefaultRowClick === undefined) {
//     //     onDefaultRowClick = onNavigateRowClick;
//     // }

//     const useQueryArg = useMemo(() => {
//         return {
//             ...queryArg!,
//             ...search.queryArg,
//         };
//     }, [queryArg, search]);

//     return (
//         <ContactsProvider value={{ search }}>
//             <List
//                 query={query!}
//                 queryArg={useQueryArg}
//                 mapResult={mapResult!}
//                 mapRowKey={mapRowKey!}
//                 mapRow={mapRow!}
//                 onRowClick={onDefaultRowClick ?? undefined}
//                 loader={defaultLoader}
//                 header={defaultHeader}
//                 {...rest}
//             />
//         </ContactsProvider>
//     );
// };

// // Contacts.classes = classes;

// export const ContactsRow = (props: PropsWithChildren<ListRowProps<Contact>>) => {
//     // const { row: contact, className, children } = useProps(`${componentName}Row`, {}, props);
//     // const location = useLocation();
//     // const active = location.pathname.includes(`/contacts/${contact.id}`);
//     return (
//         <Text>list</Text>
//         // // <List.Row
//         // //     className={clsx("orbitMemberRow", styles.row, className)}
//         // //     data-active={active || undefined}
//         // //     {...props}
//         // // >
//         //     {/* <Stack gap="xs">
//         //         <Box className={"flex shrink"}>
//         //             {contact?.avatar ? (
//         //                 <Avatar src={`${contact?.avatar}#active`} size="md" />
//         //             ) : (
//         //                 <Avatar size="md">
//         //                     <IconUser />
//         //                 </Avatar>
//         //             )}
//         //         </Box>
//         //     </Stack> */}
//         //     <Text>test 1</Text>
//         //     {children ? (
//         //         children
//         //     ) : (
//         //         <Text>test 2</Text>
//         //         // <Stack gap={0} className={"flex-1"}>
//         //         //     <Group wrap="nowrap" justify="space-between" className={classes.rowSubject}>
//         //         //         <Box className={"overflow-hidden grow"}>
//         //         //             <Text className="truncate">{contact.name}</Text>
//         //         //         </Box>
//         //         //         <Group gap="xs" className={"nudge-up-xs"}></Group>
//         //         //     </Group>
//         //         //     <Group wrap="nowrap" justify="space-between" fz="sm" className={classes.rowDescription}>
//         //         //         <Text component="span" className="whitespace-nowrap" inline c="dimmed">
//         //         //             {contact.description}
//         //         //         </Text>
//         //         //     </Group>
//         //         // </Stack>
//         //     )}
//         // </List.Row>
//     );
// };

// export const ContactsLoader = () => {
//     return (
//         <Text>test 3</Text>
//         // <Group className={clsx("px-sm")} gap="sm" wrap="nowrap">
//         //     <Stack gap="xs">
//         //         <Box className={"flex shrink"}>
//         //             <Skeleton width={38} height={38} />
//         //         </Box>
//         //     </Stack>
//         //     <Stack gap={0} className={"flex-1"}>
//         //         <Group wrap="nowrap" justify="space-between" className={classes.rowSubject}>
//         //             <Box className={"overflow-hidden grow"}>
//         //                 <Skeleton height={8} width="50%" radius="xl" mt="sm" />
//         //             </Box>
//         //             <Group gap="xs" className={"nudge-up-xs"}></Group>
//         //         </Group>
//         //         <Group wrap="nowrap" justify="space-between" fz="sm" className={classes.rowDescription}>
//         //             <Skeleton height={8} width="33%" radius="xl" mb="sm" />
//         //         </Group>
//         //     </Stack>
//         // </Group>
//     );
// };

// const styles = StyleSheet.create({
//     row: {

//     },
//     list: {
//         flex: 1,
//         width: "80%",
//     },
//     contactItem: {
//         flexDirection: "row",
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: "#ccc",
//     },
//     contactAvatar: {
//         width: 50,
//         height: 50,
//         borderRadius: 50,
//         marginRight: 10,
//         backgroundColor: "#9cf",
//     },
//     avatarImage: {
//         left: 13,
//         top: 11,
//         // width: 50,
//         // height: 50,
//         // borderRadius: 25,
//     },
//     contactInfo: {
//         flex: 1,
//     },
//     contactName: {
//         fontSize: 18,
//         color: "#000",
//     },
//     contactTitle: {
//         fontSize: 14,
//         color: "#666",
//     },

// });

// export default Contacts;
