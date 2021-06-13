import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const DEVELOPER_DRAWER_ITEMS = [
  {
    title: 'SALES',
    routes: [
      {
        route: 'Inquiry',
        label: 'Inquiry',
        icon: 'badge-account-horizontal-outline',
      },
      {
        route: 'SalesPipeline',
        label: 'Sales Pipeline',
        icon: ({color, size}) => (
          <MaterialIcons name={'filter-list'} {...{color, size}} />
        ),
      },
      {
        route: 'BookingChartStack',
        label: 'Booking Chart',
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
        route: 'Planning',
        label: 'Planning',
        icon: ({color, size}) => (
          <MaterialIcons name={'toc'} {...{color, size}} />
        ),
      },
      {
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
        route: 'Files',
        label: 'Files',
        icon: ({color, size}) => (
          <MaterialIcons name={'description'} {...{color, size}} />
        ),
      },
    ],
  },
];

export const CUSTOMER_DRAWER_ITEMS = [
  {
    title: 'CUSTOMER SECTION',
    routes: [
      {
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
