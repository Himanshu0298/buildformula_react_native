import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const DEVELOPER_DRAWER_ITEMS = [
  {
    route: 'DeveloperDashboard',
    label: 'Dashboard',
    icon: ({color, size}) => (
      <MaterialCommunityIcons
        name={'view-dashboard-outline'}
        color={color}
        size={size}
      />
    ),
  },
  {
    title: 'SALES',
    routes: [
      {
        id: 1,
        route: 'Visitors',
        label: 'Visitors',
        icon: 'badge-account-horizontal-outline',
      },
      {
        id: 2,
        route: 'SalesPipeline',
        label: 'Sales Pipeline',
        icon: ({color, size}) => (
          <MaterialIcons name={'filter-list'} {...{color, size}} />
        ),
      },
      {
        id: 3,
        route: 'BookingChartStack',
        label: 'Booking Chart',
        icon: ({color, size}) => (
          <MaterialIcons name={'library-books'} {...{color, size}} />
        ),
      },
      {
        id: 3,
        route: 'BrokerStack',
        label: 'Broker List',
        icon: ({color, size}) => (
          <MaterialIcons name={'library-books'} {...{color, size}} />
        ),
      },
    ],
  },
  {
    title: 'CUSTOMER SECTION',
    routes: [
      {
        route: 'CustomerSection',
        label: 'Customer Section',
        icon: ({color, size}) => (
          <MaterialIcons name={'recent-actors'} {...{color, size}} />
        ),
      },
    ],
  },
  {
    title: 'PROJECT MANAGEMENT',
    routes: [
      {
        route: 'Lineup',
        label: 'Lineup',
        icon: ({color, size}) => (
          <MaterialIcons name={'house-siding'} {...{color, size}} />
        ),
      },
      {
        id: 5,
        route: 'Planning',
        label: 'Planning',
        icon: ({color, size}) => (
          <MaterialIcons name={'toc'} {...{color, size}} />
        ),
      },
      {
        id: 6,
        route: 'Execution',
        label: 'Execution',
        icon: 'format-list-checks',
      },
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
    ],
  },
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
    routes: [
      {
        id: 12,
        route: 'Files',
        label: 'Files',
        icon: ({color, size}) => (
          <MaterialIcons name={'description'} {...{color, size}} />
        ),
      },
    ],
  },
  {
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
    routes: [
      {
        id: 14,
        route: 'Ownership',
        label: 'Ownership',
        icon: ({color, size}) => (
          <MaterialIcons name={'recent-actors'} {...{color, size}} />
        ),
      },
      {
        route: 'BookingDetails',
        label: 'Booking Details',
        icon: ({color, size}) => (
          <MaterialIcons name={'recent-actors'} {...{color, size}} />
        ),
      },
      {
        route: 'LoanDetails',
        label: 'Bank Loan',
        icon: ({color, size}) => (
          <MaterialIcons name={'recent-actors'} {...{color, size}} />
        ),
      },
      {
        route: 'CustomerAccount',
        label: 'Account',
        icon: ({color, size}) => (
          <MaterialIcons name={'recent-actors'} {...{color, size}} />
        ),
      },
      {
        route: 'ModifyRequest',
        label: 'Modify Request',
        icon: ({color, size}) => (
          <MaterialIcons name={'recent-actors'} {...{color, size}} />
        ),
      },
      {
        route: 'CustomerFiles',
        label: 'Files',
        icon: ({color, size}) => (
          <MaterialIcons name={'recent-actors'} {...{color, size}} />
        ),
      },
    ],
  },
];
