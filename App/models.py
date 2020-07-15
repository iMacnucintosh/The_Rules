# -*- coding: utf-8 -*-
import os

from django.db import models

def path_upload_rule(filename):
    var = filename.split('.')
    var_length = len(var) - 1
    var_extension = var[var_length]

    num_rules = len(Rule.objects.all())

    return "static/images/rules/" + str(num_rules + 1) + "." + var_extension


class Rule(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.FileField(upload_to=path_upload_rule, blank=True, null=True)
    JSFunction = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return str(self.id) + " - " + self.name