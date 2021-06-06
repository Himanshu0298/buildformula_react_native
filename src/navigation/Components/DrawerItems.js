import React from 'react';
import {Image} from 'react-native';
import StructureActive from 'assets/images/structure_icon_active.png';
import Structure from 'assets/images/structure_icon.png';
import PaymentActive from 'assets/images/payment_icon_active.png';
import Payment from 'assets/images/payment_icon.png';
import AssignTaskActive from 'assets/images/task_icon_active.png';
import AssignTask from 'assets/images/task_icon.png';
import ProcessIconActive from 'assets/images/process_icon_active.png';
import ProcessIcon from 'assets/images/process_icon.png';
import EstimationIconActive from 'assets/images/estimation_icon_active.png';
import EstimationIcon from 'assets/images/estimation_icon.png';
import OrderIconActive from 'assets/images/order_icon_active.png';
import OrderIcon from 'assets/images/order_icon.png';

export const PROJECT_DRAWER_ITEMS = [
  {
    title: 'SALES',
    routes: [
      {
        route: 'Inquiry',
        label: 'Inquiry',
        icon: 'account-question-outline',
      },
      {
        route: 'SalesPipeline',
        label: 'Sales Pipeline',
        activeIcon: ({color, size}) => (
          <Image source={StructureActive} style={{height: size, width: size}} />
        ),
        inactiveIcon: ({color, size}) => (
          <Image source={Structure} style={{height: size, width: size}} />
        ),
      },
      {
        route: 'BookingChartStack',
        label: 'Booking Chart',
        icon: 'chart-line',
      },
      {
        route: 'Payment',
        label: 'Payment',
        activeIcon: ({color, size}) => (
          <Image
            source={PaymentActive}
            style={{height: size - 5, width: size + 5}}
          />
        ),
        inactiveIcon: ({color, size}) => (
          <Image source={Payment} style={{height: size - 5, width: size + 5}} />
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
        activeIcon: ({color, size}) => (
          <Image
            source={PaymentActive}
            style={{height: size - 5, width: size + 5}}
          />
        ),
        inactiveIcon: ({color, size}) => (
          <Image source={Payment} style={{height: size - 5, width: size + 5}} />
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
        icon: 'folder-open-outline',
      },
    ],
  },
];
