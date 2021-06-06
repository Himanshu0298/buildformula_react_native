import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const PROJECT_DRAWER_ITEMS = [
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
  // {
  //   title: 'PROJECT MANAGEMENT',
  //   routes: [
  //     {
  //       route: 'Lineup',
  //       label: 'Lineup',
  //       activeIcon: ({color, size}) => (
  //         <Image
  //           source={AssignTaskActive}
  //           style={{height: size, width: size}}
  //         />
  //       ),
  //       inactiveIcon: ({color, size}) => (
  //         <Image source={AssignTask} style={{height: size, width: size}} />
  //       ),
  //     },
  //     {
  //       route: 'Planning',
  //       label: 'Planning',
  //       icon: 'calendar-clock',
  //     },
  //     {
  //       route: 'ProjectSchedule',
  //       label: 'Project Schedule',
  //       icon: 'calendar-month-outline',
  //     },
  //     {
  //       route: 'MainPhase',
  //       label: 'Main Phase',
  //       icon: 'clock-outline',
  //     },

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
