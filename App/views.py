# -*- coding: utf-8 -*-
from django.shortcuts import render

from App.models import *


def home(request):
    rules = Rule.objects.all()

    context = {
        "rules": rules
    }

    return render(request, "app/home.html", context=context)
