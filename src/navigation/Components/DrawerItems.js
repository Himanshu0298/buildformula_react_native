import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const DEVELOPER_DRAWER_ITEMS = [
  {
    id: 0,
    route: 'DeveloperHome',
    label: 'Dashboard',
    icon: ({color, size}) => (
      <MaterialCommunityIcons
        name="view-dashboard-outline"
        color={color}
        size={size}
      />
    ),
  },
  {
    title: 'PROJECT STRUCTURE',
    id: 11,
    routes: [
      {
        id: 79,
        route: 'ProjectListing',
        label: 'Project List',
        icon: 'office-building',
      },
      {
        id: 80,
        route: 'SearchPickUpList',
        label: 'Pickup List',
        icon: 'menu-open',
      },
      {
        id: 81,
        route: 'AreaList',
        label: 'Area List',
        icon: 'map-marker',
      },
      {
        id: 82,
        route: 'UnitList',
        label: 'Unit List',
        icon: 'home-city-outline',
      },
    ],
  },
  {
    title: 'SALES',
    id: 1,
    routes: [
      {
        id: 1,
        route: 'VisitorsHome',
        label: 'Inquiry',
        icon: 'badge-account-horizontal-outline',
      },
      {
        id: 2,
        route: 'SalesPipeline',
        label: 'Sales Pipeline',
        icon: ({color, size}) => (
          <MaterialIcons name="filter-list" {...{color, size}} />
        ),
      },
      {
        id: 56,
        route: 'Approval',
        label: 'Approval',
        icon: ({color, size}) => (
          <MaterialIcons name="approval" {...{color, size}} />
        ),
      },
      {
        id: 54,
        route: 'FollowUpTask',
        label: 'Follow-up Task',
        icon: ({color, size}) => (
          <AntDesign name="barchart" {...{color, size}} />
        ),
      },
      {
        id: 3,
        route: 'BC_Step_One',
        label: 'Booking Chart',
        icon: ({color, size}) => (
          <MaterialIcons name="library-books" {...{color, size}} />
        ),
      },
      {
        id: 38,
        route: 'BrokerList',
        label: 'Broker List',
        icon: ({color, size}) => (
          <MaterialIcons name="recent-actors" {...{color, size}} />
        ),
      },
    ],
  },

  {
    title: 'CUSTOMER SECTION',
    id: 7,
    routes: [
      {
        id: 16,
        route: 'CustomerList',
        label: 'Customer List',
        icon: ({color, size}) => (
          <MaterialCommunityIcons name="account-group" {...{color, size}} />
        ),
      },

      {
        id: 17,
        route: 'CS_Step_One',
        label: 'Customer Section',
        icon: ({color, size}) => (
          <MaterialCommunityIcons
            name="account-multiple-outline"
            {...{color, size}}
          />
        ),
      },

      {
        id: 19,
        route: 'DocumentGenerater',
        label: 'Document Generator',
        icon: ({color, size}) => (
          <MaterialCommunityIcons
            name="account-multiple-outline"
            {...{color, size}}
          />
        ),
      },

      // {
      //   route: 'CustomerSectionSettings',
      //   label: 'Settings',
      //   icon: ({color, size}) => (
      //     <MaterialCommunityIcons
      //       name="account-multiple-outline"
      //       {...{color, size}}
      //     />
      //   ),
      // },
    ],
  },

  {
    title: 'TODO LIST',
    id: 15,
    routes: [
      {
        id: 67,
        route: 'TaskList',
        label: 'Todo List',
        icon: ({color, size}) => (
          <Ionicons name="md-checkmark-done-circle-sharp" {...{color, size}} />
        ),
      },
    ],
  },

  {
    title: 'DESIGN MODULE',
    id: 12,
    routes: [
      {
        id: 39,
        route: 'RoughDrawingFolders',
        label: 'Rough Drawing',
        icon: ({color, size}) => (
          <MaterialCommunityIcons name="draw" {...{color, size}} />
        ),
      },
      {
        id: 40,
        route: 'FinalDrawingFolders',
        label: 'Final Drawing',
        icon: ({color, size}) => (
          <MaterialCommunityIcons
            name="file-check-outline"
            {...{color, size}}
          />
        ),
      },
      {
        id: 42,
        route: 'WorkingDrawingFolders',
        label: 'Working Drawing',
        icon: ({color, size}) => (
          <MaterialCommunityIcons
            name="vector-polyline-edit"
            {...{color, size}}
          />
        ),
      },
      {
        id: 41,
        route: 'AreaSheet',
        label: 'Areasheet',
        icon: ({color, size}) => (
          <MaterialCommunityIcons name="tab-unselected" {...{color, size}} />
        ),
      },
      {
        id: 43,
        route: 'Parking',
        label: 'Parking',
        icon: ({color, size}) => (
          <MaterialCommunityIcons name="parking" {...{color, size}} />
        ),
      },
    ],
  },
  {
    title: 'PROJECT MANAGEMENT',
    id: 8,
    routes: [
      {
        id: 20,
        route: 'WorkMaster',
        label: 'Work Master',
        icon: ({color, size}) => (
          <MaterialCommunityIcons name="home-analytics" {...{color, size}} />
        ),
      },
      {
        id: 44,
        route: 'Worklist',
        label: 'List And Gantt',
        icon: ({color, size}) => (
          <MaterialCommunityIcons
            name="format-list-bulleted"
            {...{color, size}}
          />
        ),
      },
      // {
      //   id: 53,
      //   route: 'List&Gantt',
      //   label: 'List & Gantt',
      //   icon: ({color, size}) => (
      //     <MaterialCommunityIcons
      //       name="format-list-bulleted"
      //       {...{color, size}}
      //     />
      //   ),
      // },
      {
        id: 50,
        route: 'Cost',
        label: 'Cost',
        icon: ({color, size}) => (
          <MaterialCommunityIcons
            name="script-text-outline"
            {...{color, size}}
          />
        ),
      },
      {
        id: 49,
        route: 'Raci',
        label: 'RACI',
        icon: ({color, size}) => (
          <MaterialCommunityIcons name="podium-bronze" {...{color, size}} />
        ),
      },
    ],
  },
  {
    title: 'MATERIAL',
    id: 4,
    routes: [
      {
        id: 31,
        route: 'MaterialGRNListing',
        label: 'GRN',
        icon: ({color, size}) => (
          <MaterialCommunityIcons name="wall" {...{color, size}} />
        ),
      },
      {
        id: 62,
        route: 'PRList',
        label: 'PR List',
        icon: ({color, size}) => (
          <MaterialCommunityIcons name="format-list-text" {...{color, size}} />
        ),
      },
      {
        id: 27,
        route: 'PIList',
        label: 'PI List',
        icon: ({color, size}) => (
          <MaterialIcons name="chat" {...{color, size}} />
        ),
      },
      {
        id: 58,
        route: 'MaterialIndent',
        label: 'Material Indent',
        icon: ({color, size}) => (
          <MaterialCommunityIcons name="text-short" {...{color, size}} />
        ),
      },
      {
        id: 67,
        route: 'StoreKeeperList',
        label: 'StoreKeeper',
        icon: ({color, size}) => (
          <MaterialCommunityIcons
            name="storefront-outline"
            {...{color, size}}
          />
        ),
      },
      {
        id: 32,
        route: 'MaterialInventory',
        label: 'Material Inventory',
        icon: ({color, size}) => (
          <MaterialCommunityIcons
            name="view-dashboard-outline"
            color={color}
            size={size}
          />
        ),
      },
    ],
  },
  // {
  //   title: 'PROJECT MANAGEMENT',
  //   routes: [
  //     {
  //       route: 'Lineup',
  //       label: 'Lineup',
  //       icon: ({color, size}) => (
  //         <MaterialIcons name="house-siding" {...{color, size}} />
  //       ),
  //     },
  //     {
  //       id: 5,
  //       route: 'Planning',
  //       label: 'Planning',
  //       icon: ({color, size}) => (
  //         <MaterialIcons name="toc" {...{color, size}} />
  //       ),
  //     },
  //     {
  //       id: 6,
  //       route: 'Execution',
  //       label: 'Execution',
  //       icon: 'format-list-checks',
  //     },
  // {
  //   route: 'MainPhase',
  //   label: 'Main Phase',
  //   icon: 'clock-outline',
  // },

  //     {
  //       route: 'ProcessChart',
  //       label: 'Process Chart',
  //       activeIcon: ({color, size}) => (
  //         <Image
  //           source={ProcessIconActive}
  //           style={{height: size, width: size}}
  //         />
  //       ),
  //       inactiveIcon: ({color, size}) => (
  //         <Image source={ProcessIcon} style={{height: size, width: size}} />
  //       ),
  //     },
  //   ],
  // },
  // {
  //   title: 'MATERIAL MANAGEMENT',
  //   routes: [
  //     {
  //       route: 'Estimation',
  //       label: 'Estimation',
  //       activeIcon: ({color, size}) => (
  //         <Image
  //           source={EstimationIconActive}
  //           style={{height: size, width: size}}
  //         />
  //       ),
  //       inactiveIcon: ({color, size}) => (
  //         <Image source={EstimationIcon} style={{height: size, width: size}} />
  //       ),
  //     },
  //     {
  //       route: 'RequestForPrice',
  //       label: 'Request For Price',
  //       icon: 'tag-outline',
  //     },
  //     {
  //       route: 'PurchaseOrders',
  //       label: 'Purchase Orders',
  //       activeIcon: ({color, size}) => (
  //         <Image source={OrderIconActive} style={{height: size, width: size}} />
  //       ),
  //       inactiveIcon: ({color, size}) => (
  //         <Image source={OrderIcon} style={{height: size, width: size}} />
  //       ),
  //     },
  //   ],
  // },
  {
    title: 'FILES',
    id: 5,
    routes: [
      {
        id: 12,
        route: 'Files',
        label: 'Files',
        icon: ({color, size}) => (
          <MaterialIcons name="description" {...{color, size}} />
        ),
      },
    ],
  },
  {
    id: 10,
    title: 'ROLES & SETTINGS',
    routes: [
      {
        id: 13,
        route: 'Roles',
        label: 'Roles and Members',
        icon: 'account-cog-outline',
      },
    ],
  },
];

export const CUSTOMER_DRAWER_ITEMS = [
  {
    title: 'CUSTOMER SECTION',
    id: 7,
    routes: [
      {
        id: 14,
        route: 'Ownership',
        label: 'Ownership',
        icon: ({color, size}) => (
          <MaterialIcons name="recent-actors" {...{color, size}} />
        ),
      },
      {
        route: 'BookingDetails',
        label: 'Booking Details',
        icon: ({color, size}) => (
          <MaterialIcons name="recent-actors" {...{color, size}} />
        ),
      },
      {
        id: 16,
        route: 'LoanDetails',
        label: 'Bank Loan',
        icon: ({color, size}) => (
          <MaterialIcons name="recent-actors" {...{color, size}} />
        ),
      },
      {
        id: 17,
        route: 'CustomerAccount',
        label: 'Account',
        icon: ({color, size}) => (
          <MaterialIcons name="recent-actors" {...{color, size}} />
        ),
      },
      {
        id: 18,
        route: 'ModifyRequest',
        label: 'Modify Request',
        icon: ({color, size}) => (
          <MaterialIcons name="recent-actors" {...{color, size}} />
        ),
      },
      {
        id: 19,
        route: 'CustomerFiles',
        label: 'Files',
        icon: ({color, size}) => (
          <MaterialIcons name="recent-actors" {...{color, size}} />
        ),
      },
    ],
  },
];
